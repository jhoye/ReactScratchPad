using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace DemoA.Services
{
    public class MessageService : IMessageService, IDisposable
    {
        private readonly ConnectionFactory _factory;
        private readonly IConnection _connection;
        private readonly IModel _channel;
        private readonly IStatusHub _statusHub;

        private static string _status;

        public string Status
        {
            get
            {
                return _status;
            }
        }

        public MessageService(
            IConfiguration configuration,
            IStatusHub statusHub
        )
        {
            _statusHub = statusHub;

            try
            {
                #region create connection factory, etc.

                _factory = new ConnectionFactory
                {
                    HostName = configuration["RabbitMQ:HostName"],
                    UserName = configuration["RabbitMQ:UserName"],
                    Password = configuration["RabbitMQ:Password"],
                    VirtualHost = configuration["RabbitMQ:VirtualHost"]
                };

                _factory.RequestedHeartbeat = 15;

                _connection = _factory.CreateConnection();
                _channel = _connection.CreateModel();

                #endregion

                #region subscribe to status

                _status = "n/a";

                _channel.ExchangeDeclare(exchange: "status", type: ExchangeType.Fanout);

                var queueName = _channel.QueueDeclare().QueueName;
                _channel.QueueBind(queue: queueName,
                                exchange: "status",
                                routingKey: "");

                var consumer = new EventingBasicConsumer(_channel);
                consumer.Received += (model, ea) =>
                {
                    var body = ea.Body;
                    var message = Encoding.UTF8.GetString(body);

                    _status = message;

                    Func<Task> r = () => {
                        return _statusHub.SendMessage(_status);
                    };

                    Task.Run(r);
                };
                _channel.BasicConsume(queue: queueName,
                                    autoAck: true,
                                    consumer: consumer);

                #endregion
            }
            catch(Exception e)
            {
                _status = FormatErrorMessage(e);
            }
        }

        public string SendCommand()
        {
            try
            {
                using (var connection = _factory.CreateConnection())
                using (var channel = connection.CreateModel())
                {
                    channel.QueueDeclare(queue: "test_command",
                        durable: true,
                        exclusive: false,
                        autoDelete: true,
                        arguments: null);

                    var properties = channel.CreateBasicProperties();
                    properties.Persistent = true;

                    var body = Encoding.UTF8.GetBytes("generate reports");

                    channel.BasicPublish(exchange: string.Empty,
                        routingKey: "test_command",
                        mandatory: true,
                        basicProperties: properties,
                        body: body);

                    channel.Close();
                    connection.Close();
                }

                return $"Command was posted. Timestamp: {DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1)).TotalSeconds}";
            }
            catch(Exception e)
            {
                return FormatErrorMessage(e);
            }
        }

        public void Dispose()
        {
            _connection.Close();
            _connection.Dispose();
            _channel.Dispose();
        }

        private string FormatErrorMessage(Exception e)
        {
            return $"Error: {e.Message} (Ensure that you can connect to the RabbitMQ host.)";
        }
    }
}