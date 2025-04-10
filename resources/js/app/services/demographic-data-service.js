import axios from "axios";

export async function create_demographic_service(data) {
    const res = await axios.post('/api/demographics', data);
    return res.data;
}

export async function get_barangay_service() {
  const res = await axios.get('/api/get_barangay'+window.location.search);
  return res.data;
}


// export async function get_demographics_service() {
//     const res = await axios.get('/api/demographics');
//     return res.data.response;
// }

// Function to fetch all contents
export async function get_demographics_service() {
    const res = await axios.get(`/api/demographics${window.location.search??'?page=1'}`); // Pass page number in query string
    return res.data; // Assuming the data contains paginated response (e.g., data, currentPage, totalPages)
}


export async function fetch_demographic_by_id_service(id) {
    const response = await axios.get(`/api/demographics/${id}`);
    return response.data; // Return the data from the response
}

export async function update_demographic_service(data) {
    const response = await axios.put(`/api/demographics/${data.id}`, data);
    return response.data;
};

export async function update_demographic_status_service(data) {
  const response = await axios.put(`/api/updateStatus/${data.id}`, data);
  return response.data;
};

export const deleteDemographicService = async (id) => {
    try {
      const response = await fetch(`/api/demographics/${id}`, {
        method: "DELETE",
        headers: {
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content,
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete.");
      }
  
      return id; // Return ID to remove it from Redux state
    } catch (error) {
      throw error;
    }
  };