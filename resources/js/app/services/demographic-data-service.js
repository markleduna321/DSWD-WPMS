import axios from "axios";

export async function create_demographic_service(data) {
    const res = await axios.post('/api/demographics', data);
    return res.data;
}

export async function get_demographics_service() {
    const res = await axios.get('/api/demographics');
    return res.data.response;
}

export async function fetch_demographic_by_id_service(id) {
    try {
        const response = await axios.get(`/api/demographics/${id}`);
        return response.data; // Return the data from the response
    } catch (error) {
        handleError(error); // Handle error using the utility function
        throw error; // Ensure error is propagated
    }
}