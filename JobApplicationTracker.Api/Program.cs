using JobApplicationTracker.Api.Data;
using JobApplicationTracker.Api.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.InMemory;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//my connection to the in memory database
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseInMemoryDatabase("JobApplicationsDb"));

//registering the repo
builder.Services.AddScoped<IJobApplicationRepository, JobApplicationRepository>();

builder.Services.AddSwaggerGen();




var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";


builder.Services.AddCors(options => { 
    options.AddPolicy(name: MyAllowSpecificOrigins, policy => { 
    policy.AllowAnyHeader(); 
    policy.AllowAnyHeader(); 
}); 
});






builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", builder =>
    {
        builder.WithOrigins([
            "http://localhost:3000", 
            "http://localhost:7217/", 
            "http://localhost:5109/",
            "https://localhost:3000/",
            "https://localhost:7217/",
            "https://localhost:5109/",
            "http://localhost:5109/api/JobApplications",
            "*"

        ])
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});


var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

// set up swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
