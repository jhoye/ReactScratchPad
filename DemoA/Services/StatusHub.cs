using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace DemoA.Services
{
    public class StatusHub : Hub, IStatusHub
    {
        protected IHubContext<StatusHub> _context;

        public StatusHub(IHubContext<StatusHub> context)
        {
            _context = context;
        }

        public Task SendMessage(string message)
        {
            var allClients = _context.Clients.All;

            return allClients.SendAsync("ReceiveMessage", message);
        }
    }
}