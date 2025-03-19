import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5109/api/JobApplications";

function ApplicationList() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editedApplication, setEditedApplication] = useState({});

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(API_URL);
        setApplications(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleEdit = (application) => {
    setEditId(application.id);
    setEditedApplication({ ...application });
  };

  const handleSave = async () => {
    try {
      await axios.put(`${API_URL}/${editId}`, editedApplication);
      const updatedApplications = applications.map((app) =>
        app.id === editId ? editedApplication : app
      );
      setApplications(updatedApplications);
      setEditId(null);
    } catch (error) {
      console.error("Error updating application:", error);
    }
  };

  const handleChange = (e) => {
    setEditedApplication({
      ...editedApplication,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Job Applications</h2>
      <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Position</th>
            <th>Status</th>
            <th>Date Applied</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id}>
              <td id="first_column">
                {editId === application.id ? (
                  <input
                    type="text"
                    name="companyName"
                    value={editedApplication.companyName}
                    onChange={handleChange}
                  />
                ) : (
                  application.companyName
                )}
              </td>
              <td>
                {editId === application.id ? (
                  <input
                    type="text"
                    name="position"
                    value={editedApplication.position}
                    onChange={handleChange}
                  />
                ) : (
                  application.position
                )}
              </td>
              <td>
                {editId === application.id ? (
                  <select
                    name="status"
                    value={editedApplication.status}
                    onChange={handleChange}
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                ) : (
                  application.status
                )}
              </td>
              <td>
                {editId === application.id ? (
                  <input
                    type="date"
                    name="dateApplied"
                    value={editedApplication.dateApplied.split("T")[0]}
                    onChange={handleChange}
                  />
                ) : (
                  new Date(application.dateApplied).toLocaleDateString()
                )}
              </td>
              <td id="edit">
                {editId === application.id ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(application)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicationList;
