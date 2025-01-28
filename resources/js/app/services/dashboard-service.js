import axios from "axios";

export async function get_beneficiaries_service() {
    const res = await axios.get('/api/beneficiaries');
    return res.data.response;
}