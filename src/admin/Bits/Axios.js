import axios, { CanceledError } from 'axios';
import { baseUrl } from '../setting';


const DEBUG = false
const axiosStatic = axios

axiosStatic.defaults['retryCount'] = 0
axiosStatic.defaults['timeout'] = 5500
axiosStatic.defaults.responseType = 'json';


class Http {

    axiosInstance

    create(config) {
        this.axiosInstance = this._createInstance(config)
        this.axiosInstance.defaults = axiosStatic.defaults
        return this.axiosInstance
    }

    _createInstance(config) {
        const service = axiosStatic.create(config)

        service.interceptors.response.use(this._successHandler, this._errorHandler)

        return service
    }

    _successHandler(response) {
        return response
    }

    async _errorHandler(error) {
        const { code, config } = error;
        const response = error.response
        const { retryCount, cancel, instance, cancelToken } = config;

        if (!response) {
            if (retryCount < 3) {
                const axiosIns = instance
                const newRetry = retryCount + 1
                const newTimeout = 0
                const originalConfig = { ...config, timeout: newTimeout, retryCount: newRetry, instance: axiosIns, cancel: cancel };
                if (DEBUG) {
                    console.error(`request error ${code}`, '===>', originalConfig)
                    try {
                        return await axiosIns.request(originalConfig)
                    } catch (error) {
                        cancelToken?.cancel();
                        return Promise.reject(error)
                    }
                }
            }

        }

        return Promise.reject(error)

    }




}


const axiosIns = new Http()



export const RabbitService = axiosIns.create({
  baseURL: baseUrl.RABBIT_SERVICE,
  timeout: 0
})

RabbitService.interceptors.response.use(
  async function(response) {

    return response;
}, async function(error) {

    if (error instanceof CanceledError) {
        return Promise.reject(error);
    }

    if (error.response?.status == 401) {
        // await router.push({ name: ROUTE_NAMES.HOME_PAGE })
        // Vue.swal({
        //     title: 'Oops, your session has expired. Lets try to log in again!',
        //     heightAuto: false
        // }).then(
        //     await ApplicationDSModule.redirectToCAS
        // )
    }
    // if (error.response?.status == 304) {
    //     const cacheControl = CacheControlDsModule.getCacheControl(hash({ baseURL: error.config.baseURL, params: error.config.params }));
    //     return cacheControl ? cacheControl.respons : "";
    // } else {
    //     const message = getStatusText(error)
    //     createToastNotification(message, { type: 'error', position: 'bottom' })
    // }
    // console.log('ERROR: ' + error)
    console.log(  `%c ERROR`, `color: #D38941` ,'==>' , error)
    return Promise.reject(error);
}


)

RabbitService.interceptors.request.use(
  (config) => {

    // if (AbrAuthDSModule.hasUserAccess) {
    //     config.headers['Authorization'] = 'Bearer ' + AbrAuthDSModule.accessToken;
    // }
    // const cacheControl = CacheControlDsModule.getCacheControl(hash({ baseURL: config.baseURL, params: config.params }));
    // if (cacheControl) {
    //     config.headers['cache-control'] = cacheControl.cacheControl;
    // }
    if (!Object.keys(config.headers).includes('Activity')) {
        config.headers['Activity'] = true;
    }
    if(!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    }

    // config.headers['Accept-Language'] = AbrAppDSModule.layout.language;

    return config
  },
  (error) => {
    Promise.reject(error)
  }
)