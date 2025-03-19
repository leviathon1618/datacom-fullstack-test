namespace JobApplicationTracker.Api.Models
{
    public class JobApplication
    {
        public int Id { get; set; } // id
        public string CompanyName { get; set; }// name of company
        public string Position { get; set; } // what kind of position to display
        public string Status { get; set; } // this will hold what step the application is up to
        public DateTime DateApplied { get; set; } // when you applied
    }
}
