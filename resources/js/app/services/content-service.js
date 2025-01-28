import axios from "axios";

export async function create_content_service(data) {
    const res = await axios.post('/api/contents', data);
    return res;
}

// Function to fetch all contents
export async function fetch_all_contents_service() {
    const res = await axios.get(`/api/contents${window.location.search??'?page=1'}`); // Pass page number in query string
    return res.data; // Assuming the data contains paginated response (e.g., data, currentPage, totalPages)
}

export async function fetch_latest_contents_service() {
    const res = await axios.get(`/api/get_latest_content`); // Pass page number in query string
    return res.data; // Assuming the data contains paginated response (e.g., data, currentPage, totalPages)
}

export async function get_content_by_id_service(id) {
    const res = await axios.get('/api/contents/' + id);
    return res.data.response;
}

export async function updateContentService(data) {
    const res = await axios.put(`/api/contents/${data.id}`, data);
    return res.data.response;
}

export async function deleteContentService(id) {
    const response = await axios.delete(`/api/contents/${id}`);
    return response.data;
}

