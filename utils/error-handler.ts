import { showToast } from "./toast";

export const handleAPIError = (error: any) => {
    if (error?.response?.data) {
        showToast("error", error?.response?.data?.message ?? error.message);
        console.log(error?.response?.data);
        return;
      }

      if (error?.message) {
        showToast("error", error.message);
        console.log(error?.error.message);
        return;
      }
      showToast("error", "An error occurred");
}
