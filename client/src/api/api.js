import axios from "axios"
import csrf from './csrf'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
});

const calculatePercentage = (loaded, total) => (Math.floor(loaded * 1.0) / total);

const progress = (config = { showSpinner: false }) => {
    let requestsCounter = 0;

    const setupStartProgress = () => {
        api.interceptors.request.use((conf) => {
            // eslint-disable-next-line
            requestsCounter++;

            if (NProgress) {
                NProgress.start();
            }
            return conf;
        });
    };

    const setupUpdateProgress = () => {
        const update = (e) => NProgress.inc(calculatePercentage(e.loaded, e.total));

        api.defaults.onDownloadProgress = update;
        api.defaults.onUploadProgress = update;
    };

    const setupStopProgress = () => {
        const responseFunc = (response) => {
            // eslint-disable-next-line
            if ((--requestsCounter) === 0) {
                NProgress.done();
            }
            return response;
        };

        const errorFunc = (error) => {
            // eslint-disable-next-line
            if ((--requestsCounter) === 0) {
                NProgress.done();
            }
            return Promise.reject(error);
        };

        api.interceptors.response.use(responseFunc, errorFunc);
    };

    NProgress.configure(config);

    setupStartProgress();
    setupUpdateProgress();
    setupStopProgress();
};

/**
 * @param {String} path uri
 * @param {Object} data
 * @param {Function} callback
 */
const post = async (path, data = {}, callback) => {
  try {
    const token = await csrf();

    const success = await api.post(path, data, {
      headers: {
        'X-CSRF-TOKEN': token
      }
    })

    callback(success, null)
  } catch (error) {
    callback(null, error)
  }
}

/**
 * @param {String} path uri
 * @param {Object} data
 * @param {Function} callback
 */
const put = async (path, data = {}, callback) => {
  try {
    const token = await csrf();

    const success = await api.put(path, data, {
      headers: {
        'X-CSRF-TOKEN': token
      }
    })

    callback(success, null)
  } catch (error) {
    callback(null, error)
  }
}

export default api
export { post, put, progress }
