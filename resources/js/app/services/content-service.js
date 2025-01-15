import axios from "axios";

export async function create_content_service(data) {
    const res = await axios.post('/api/contents', data);
    return res;
}