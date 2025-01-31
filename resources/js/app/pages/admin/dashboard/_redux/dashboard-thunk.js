import { get_beneficiaries_service, get_contents_service, get_countbrgy_service } from "@/app/services/dashboard-service";
import { dashboardSlice } from "./dashboard-slice";
import { demographicSlice } from "../../demographic_data/_redux/demographic-data-slice";

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

export function get_countbrgy_thunk() {
  return async function (dispatch, getState) {
    try {
      const data = await get_countbrgy_service(); // Pass page number
      dispatch(dashboardSlice.actions.setDashboard(data.response)); // Store paginated data
      console.log('Demographic thunk', data.response);
    } catch (error) {
      console.error("Error fetching contents:", error);
    }
  };
}