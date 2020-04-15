using System.Threading.Tasks;

namespace DemoA.Services
{
    public interface IMessageService
    {
        string Status { get; }

        string SendCommand();
    }

    public interface IStatusHub
    {
        Task SendMessage(string message);
    }
}