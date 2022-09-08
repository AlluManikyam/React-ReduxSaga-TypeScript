import axios, { AxiosInstance } from 'axios'
import { config } from 'api/variables'
import { getLoggedInUser } from 'utils/helpers/authUtils'
import { toast } from 'react-toastify'
import storeInstance from 'store/configureStore'
import { actions } from 'store/common/slice'

const baseAxios: AxiosInstance = axios.create({
  baseURL: `${config.baseUrl}`,
  timeout: 15000,
})

baseAxios.interceptors.request.use(
  function (request) {
    storeInstance.store.dispatch(
      actions.setNetworkCallRequestConfig({ loading: true }),
    )
    if (getLoggedInUser()?.jwt) {
      //request.headers.jwt = `${getLoggedInUser().jwt}`
    }
    return request
  },
  function (error) {
    console.log(error)
    throw error
  },
)

baseAxios.interceptors.response.use(
  function (response: any) {

    // File download
    if (response.data instanceof Blob) {
      storeInstance.store.dispatch(
        actions.setNetworkCallResponseConfig({ loading: false, error: null }),
      )
      return response
    }

    // Success response
    if (response.status === 200) {
      storeInstance.store.dispatch(
        actions.setNetworkCallResponseConfig({ loading: false, error: null }),
      )
      return response.data
    }

    // Failure response
    storeInstance.store.dispatch(
      actions.setNetworkCallResponseConfig({ loading: false, error: response }),
    )
    toast.error(`${response.data.error.message}`)
    throw response
  },
  function (error) {
    storeInstance.store.dispatch(
      actions.setNetworkCallResponseConfig({ loading: false, error: error?.data?.error?.message }),
    )
    if (!error.response) return
    else {
      const errorInfo = error?.response?.data?.error
      let errorMessage = errorInfo?.message
      if (errorInfo?.code === 422) {
        errorMessage = errorInfo?.data?.map((err: { message: string }) => err.message).join(',')
      }
      toast.error(errorMessage)
    }
    throw error
  },
)

export { baseAxios }
