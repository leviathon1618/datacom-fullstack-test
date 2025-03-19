import "./App.css";
import React, { useState } from "react";
import ApplicationList from "./ApplicationList";
import ApplicationForm from "./ApplicationForm";

function App() {
  const [applicationsUpdated, setApplicationsUpdated] = useState(false);

  const handleApplicationAdded = () => {
    setApplicationsUpdated(!applicationsUpdated);
  };

  return (
    <div>
      <div className="main-body">
        <div>
          <h1>Job Application Tracker</h1>
          <ApplicationForm onApplicationAdded={handleApplicationAdded} />
          <ApplicationList key={applicationsUpdated} />
        </div>
      </div>
    </div>
  );
}

export default App;
