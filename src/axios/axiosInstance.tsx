import axios from 'axios';

const axiosInstance = (history = null) => {
    //  We have used fake request api for now
    //  Update below api with your working api
    const baseURL = "https://reqres.in/api";

    let headers: any = {};

    if (localStorage.token) {
        headers.Authorization = localStorage.token;
    }

    const axiosInstanceInner = axios.create({
        baseURL: baseURL,
        headers
    });

    function clearTokenAndRedirectToHome() {
        localStorage.removeItem('token');

        if (history) {
            history.push('/');
        }
        else {
            //@ts-ignore
            window.location = "/";
        }
    }

    axiosInstanceInner.interceptors.request.use((request) => {
        return request;
    }, error => {
        return Promise.reject(error);
    });

    axiosInstanceInner.interceptors.response.use((response) =>
        new Promise((resolve, reject) => {
            resolve(response);
        }), (error) => {
            if (error.message === "Network Error") {
                return new Promise((resolve, reject) => {
                    reject({ show: true, type: "error", message: "Api Not Working" });
                })
            }

            if (!error.response) {
                return new Promise((resolve, reject) => {
                    reject({ show: true, type: "error", message: error.response.data.message });
                })
            }

            if (error.response.status === 401) {
                clearTokenAndRedirectToHome();
                return new Promise((resolve, reject) => {
                    reject({ show: true, type: "error", message: error.response.data.message });
                });
            }
            else {
                return new Promise((resolve, reject) => {
                    reject({ show: true, type: "error", message: error.response.data.message });
                })
            }
        }
    );

    return axiosInstanceInner;
}

export default axiosInstance;