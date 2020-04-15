using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace ServiceSimulator
{
    public class ReportProcess
    {
        public static ReportProcess Initialize(
            AwaitingCommandsHandler onAwaitingCommands,
            ReceivedCommandHandler onReceivedCommand,
            StateUpdatedHandler onStateUpdated
        )
        {
            return new ReportProcess(onAwaitingCommands, onReceivedCommand, onStateUpdated);
        }

        public string LastCommand { get; set; }

        public DateTime LastCommandTimeStamp { get; set; }

        public bool IsGeneratingReports { get; set; }

        public int FilesToGenerate { get; set; }

        public int FilesGenerated { get; set; }

        public delegate void ReceivedCommandHandler(ReportProcess reportProcess);

        private event ReceivedCommandHandler _receivedCommand;

        public delegate void StateUpdatedHandler(ReportProcess reportProcess);

        private event StateUpdatedHandler _stateUpdated;

        public delegate void AwaitingCommandsHandler();

        private event AwaitingCommandsHandler _awaitingCommands;

        private delegate void PublishStateNotificationHandler(string message);

        private event PublishStateNotificationHandler _publishStateNotification;

        public ReportProcess(
            AwaitingCommandsHandler onAwaitingCommands,
            ReceivedCommandHandler onReceivedCommand,
            StateUpdatedHandler onStateUpdated)
        {
            var factory = new ConnectionFactory
            {
                HostName = Configuration.HostName,
                UserName = Configuration.UserName,
                Password = Configuration.Password,
                VirtualHost = Configuration.VirtualHost
            };

            // wire up event handlers
            _awaitingCommands += onAwaitingCommands;
            _receivedCommand += onReceivedCommand;
            _stateUpdated += onStateUpdated;

            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                #region status emitter

                channel.ExchangeDeclare(exchange: "status", type: ExchangeType.Fanout);

                _publishStateNotification += (string message) =>
                {
                    var body = Encoding.UTF8.GetBytes(message);

                    channel.BasicPublish(exchange: "status",
                        routingKey: "",
                        basicProperties: null,
                        body: body);
                };

                #endregion

                #region command message receiver

                channel.QueueDeclare(queue: "test_command",
                    durable: true,
                    exclusive: false,
                    autoDelete: true,
                    arguments: null);

                var consumer = new EventingBasicConsumer(channel);

                consumer.Received += (model, ea) =>
                {
                    LastCommand = Encoding.UTF8.GetString(ea.Body);
                    LastCommandTimeStamp = DateTime.UtcNow;

                    _receivedCommand(this);

                    switch (LastCommand.ToLower())
                    {
                        case "generate reports":
                            GenerateReports();
                            break;
                    }
                };

                channel.BasicConsume(queue: "test_command",
                    autoAck: true,
                    consumer: consumer);

                #endregion

                _awaitingCommands();
            }
        }

        private void GenerateReports()
        {
            if (IsGeneratingReports)
            {
                return;
            }

            Task.Run(SimulateFileGeneration);
        }

        private void SimulateFileGeneration()
        {
            Thread.Sleep(500);
            IsGeneratingReports = true;
            FilesToGenerate = 100;

            while (FilesGenerated < FilesToGenerate)
            {
                Thread.Sleep(100);

                FilesGenerated++;

                if (FilesGenerated % 10 == 0)
                {
                    _publishStateNotification($"Generating files ({FilesGenerated} / {FilesToGenerate} done)...");
                    _stateUpdated(this);
                }
            }

            _publishStateNotification($"{FilesGenerated} files generated at {DateTime.Now:h:mm:ss.fff tt}.");
            _stateUpdated(this);

            Thread.Sleep(2000);
            IsGeneratingReports = false;
            FilesGenerated = 0;
            FilesToGenerate = 0;
            _stateUpdated(this);
        }
    }
}
