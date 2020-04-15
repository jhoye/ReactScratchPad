using Microsoft.EntityFrameworkCore;

namespace DemoA.Models
{
    public class StatsContext : DbContext
    {
        public StatsContext(DbContextOptions<StatsContext> options) : base(options)
        {
        }

        public DbSet<StatType> StatTypes { get; set; }

        public DbSet<Stat> Stats { get; set;}
    }
}