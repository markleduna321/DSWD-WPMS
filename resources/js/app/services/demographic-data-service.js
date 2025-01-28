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
    const response = await axios.get(`/api/demographics/${id}`);
    return response.data; // Return the data from the response
}

export async function update_demographic_service(data) {
    const response = await axios.put(`/api/demographics/${data.id}`, data);
    return response.data;
};
