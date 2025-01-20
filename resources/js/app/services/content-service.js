import axios from "axios";

export async function create_content_service(data) {
    const res = await axios.post('/api/contents', data);
    return res;
}

// Function to fetch all contents
export async function fetch_all_contents_service(page = 1) {
    const res = await axios.get(`/api/contents?page=${page}`); // Pass page number in query string
    return res.data; // Assuming the data contains paginated response (e.g., data, currentPage, totalPages)
}
