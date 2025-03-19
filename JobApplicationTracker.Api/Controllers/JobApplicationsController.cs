using Microsoft.AspNetCore.Mvc;
using JobApplicationTracker.Api.Models;
using JobApplicationTracker.Api.Repositories;
using System.Threading.Tasks;

namespace JobApplicationTracker.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobApplicationsController : ControllerBase
    {
        private readonly IJobApplicationRepository _repository;

        public JobApplicationsController(IJobApplicationRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetApplications()
        {
            var applications = await _repository.GetAllAsync();
            return Ok(applications);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetApplication(int id)
        {
            var application = await _repository.GetByIdAsync(id);
            if (application == null)
            {
                return NotFound();
            }
            return Ok(application);
        }

        [HttpPost]
        public async Task<IActionResult> CreateApplication([FromBody] JobApplication application)
        {
            if (application == null)
            {
                return BadRequest("Job application is null.");
            }
            await _repository.AddAsync(application);
            return CreatedAtAction(nameof(GetApplication), new { id = application.Id }, application);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateApplication(int id, [FromBody] JobApplication application)
        {
            if (application == null || id != application.Id)
            {
                return BadRequest("Invalid job application or ID mismatch.");
            }
            var existingApplication = await _repository.GetByIdAsync(id);
            if (existingApplication == null)
            {
                return NotFound();
            }
            existingApplication.CompanyName = application.CompanyName;
            existingApplication.Position = application.Position;
            existingApplication.Status = application.Status;
            existingApplication.DateApplied = application.DateApplied;

            await _repository.UpdateAsync(existingApplication);
            return NoContent();
        }
    }
}