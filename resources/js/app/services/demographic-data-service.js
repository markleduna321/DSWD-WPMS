import axios from "axios";

export async function create_user_service(data) {
    const res = await axios.post('/api/usermanagement', data);
    return res;
}