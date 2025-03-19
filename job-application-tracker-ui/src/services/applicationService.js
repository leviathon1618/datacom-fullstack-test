import axios from "axios";

const API_URL = "http://localhost:5109/swagger/index.html";

const ApplicationService = {
  getAllApplications: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  //todo: add more methods (addApplication, updateApplication)
};

export default ApplicationService;
