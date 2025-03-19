using Microsoft.EntityFrameworkCore;
using JobApplicationTracker.Api.Models;

namespace JobApplicationTracker.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<JobApplication> JobApplications { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseInMemoryDatabase("JobApplicationsDb");
            }
        }
    }
}
