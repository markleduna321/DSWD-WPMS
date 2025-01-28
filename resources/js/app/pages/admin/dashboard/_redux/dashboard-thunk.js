import { get_beneficiaries_service, get_contents_service } from "@/app/services/dashboard-service";
import { dashboardSlice } from "./dashboard-slice";

export function get_beneficiaries_thunk() {
    return async function (dispatch) {
        try {
            const result = await get_beneficiaries_service();
            console.log("Fetched Beneficiaries:", result);
            dispatch(dashboardSlice.actions.setDashboard(result));
        } catch (error) {
            console.error("Error fetching Beneficiaries:", error);
        }
    };
}

export function get_contents_thunk() {
    return async function (dispatch) {
        try {
            const result = await get_contents_service();
            console.log("Fetched contents:", result);
            dispatch(dashboardSlice.actions.setContents(result));
        } catch (error) {
            console.error("Error fetching Beneficiaries:", error);
        }
    };
}