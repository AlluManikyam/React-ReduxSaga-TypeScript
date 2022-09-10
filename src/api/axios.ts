import axios, { AxiosInstance } from "axios";
import { config } from "api/variables";
import { getLoggedInUser } from "utils/helpers/authUtils";
import { toast } from "react-toastify";
import storeInstance from "store/configureStore";
import { actions } from "store/common/slice";

const baseAxios: AxiosInstance = axios.create({
  baseURL: `${config.baseUrl}`,
  timeout: 15000,
});

baseAxios.interceptors.request.use(
  function (request: any) {
    storeInstance.store.dispatch(
      actions.setNetworkCallRequestConfig({ loading: true })
    );
    console.log("getLoggedInUser:::::::", getLoggedInUser().appId);
    console.log("getLoggedInUser:::::::storeInstance.store", storeInstance.store);

    if (getLoggedInUser()?.appId) {
      request.headers["app-id"] = `${getLoggedInUser().appId}`;
    }
    return request;
  },
  function (error) {
    console.log(error);
    throw error;
  }
);

baseAxios.interceptors.response.use(
  function (response: any) {
    // File download
    if (response.data instanceof Blob) {
      storeInstance.store.dispatch(
        actions.setNetworkCallResponseConfig({ loading: false, error: null })
      );
      return response;
    }

    // Success response
    if (response.status === 200) {
      storeInstance.store.dispatch(
        actions.setNetworkCallResponseConfig({ loading: false, error: null })
      );
      return response.data;
    }

    // Failure response
    storeInstance.store.dispatch(
      actions.setNetworkCallResponseConfig({ loading: false, error: response })
    );
    toast.error(`${response.data.error}`);

    throw response;
  },
  function (error) {
    const errorMessage: string = error?.response?.data?.error;
    if (errorMessage) {
      toast.error(errorMessage);
    }
    storeInstance.store.dispatch(
      actions.setNetworkCallResponseConfig({
        loading: false,
        error: errorMessage,
      })
    );
    throw error;
  }
);

export { baseAxios };
