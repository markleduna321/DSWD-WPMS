import axios from "axios";

export async function create_demographic_service(data) {
    const res = await axios.post('/api/demographics', data);
    return res.data;
}

export async function get_demographics_service() {
    const res = await axios.get('/api/demographics');
    return res.data.response;
}

export async function get_demographic_by_id_service(id) {
    const res = await axios.get('/api/demographics/' + id);
    return res.data.response;
}