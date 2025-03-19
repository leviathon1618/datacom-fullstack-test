using System.Collections.Generic;
using System.Threading.Tasks;
using JobApplicationTracker.Api.Data;
using JobApplicationTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace JobApplicationTracker.Api.Repositories
{
    public class JobApplicationRepository : IJobApplicationRepository
    {
        private readonly ApplicationDbContext _context;

        public JobApplicationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<JobApplication>> GetAllAsync()
        {
            return await _context.JobApplications.ToListAsync();
        }

        public async Task<JobApplication> GetByIdAsync(int id)
        {
            return await _context.JobApplications.FindAsync(id);
        }

        public async Task AddAsync(JobApplication application)
        {
            await _context.JobApplications.AddAsync(application);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(JobApplication application)
        {
            _context.JobApplications.Update(application);
            await _context.SaveChangesAsync();
        }
    }
}