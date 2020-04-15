using App = System.Console;

namespace ServiceSimulator
{
    class Program
    {
        public static void Main(string[] args)
        {
            ReportProcess.Initialize(
                OnAwaitingCommands,
                OnReceivedCommand,
                OnStateUpdated
            );
        }

        private static void OnAwaitingCommands()
        {
            EmitHeader();
            App.WriteLine("Awaiting commands...");
            EmitFooter();
            App.ReadLine();
        }

        private static void OnReceivedCommand(ReportProcess reportProcess)
        {
            EmitReportProcessState(reportProcess);
        }

        private static void OnStateUpdated(ReportProcess reportProcess)
        {
            EmitReportProcessState(reportProcess);
        }

        private static void EmitReportProcessState(ReportProcess reportProcess)
        {
            App.Clear();
            EmitHeader();
            App.WriteLine($"Last Command Text ...... \"{reportProcess.LastCommand}\"");
            App.WriteLine($"Last Command Time ...... {reportProcess.LastCommandTimeStamp.ToLocalTime():M/d/yyyy h:mm:ss.fff tt}");
            App.WriteLine($"Generating Reports ..... {(reportProcess.IsGeneratingReports ? "yes" : "no")}");
            App.WriteLine($"Files Generated ........ {reportProcess.FilesGenerated} / {reportProcess.FilesToGenerate}");
            EmitFooter();
        }

        private static void EmitHeader()
        {
            App.WriteLine("╔═══════════════════════╗");
            App.WriteLine("║   Service Simulator   ║");
            App.WriteLine("╚═══════════════════════╝");
            App.WriteLine();
        }

        private static void EmitFooter()
        {
            App.WriteLine();
            App.WriteLine("╔═══════════════════════╗");
            App.WriteLine("║ Press [enter] to EXIT ║");
            App.WriteLine("╚═══════════════════════╝");
        }
    }
}
