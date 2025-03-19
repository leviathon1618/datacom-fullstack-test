import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5109/api/JobApplications";

function ApplicationForm({ onApplicationAdded }) {
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Applied");
  const [dateApplied, setDateApplied] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, {
        companyName,
        position,
        status,
        dateApplied: new Date(dateApplied).toISOString(),
      });
      onApplicationAdded();

      // Clear out the form
      setCompanyName("");
      setPosition("");
      setStatus("Applied");
      setDateApplied("");
    } catch (error) {
      //error handling in case of an api failiure
      console.error("Error adding application:", error);
    }
  };

  return (
    <div>
      <h2>Add Job</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Position:</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label>Date Applied:</label>
          <input
            type="date"
            value={dateApplied}
            onChange={(e) => setDateApplied(e.target.value)}
            required
          />
        </div>
        <div id="submit_container">
          <button id="submit_button" type="submit">
            Add Application
          </button>
        </div>
      </form>
    </div>
  );
}

export default ApplicationForm;
