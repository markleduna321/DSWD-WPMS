import axios from "axios";

export async function get_beneficiaries_service() {
    const res = await axios.get('/api/beneficiaries');
    return res.data.response;
}

export async function get_contents_service() {
    const res = await axios.get('/api/dashboardContents');
    return res.data.response;
}

export async function get_countbrgy_service() {
    const res = await axios.get(`/api/countbrgy`); // Pass page number in query string
    return res.data; // Assuming the data contains paginated response (e.g., data, currentPage, totalPages)
}