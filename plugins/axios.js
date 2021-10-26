export default function ({$axios, redirect, app}) {
    $axios.onRequest(config => {
        let jwt = localStorage.getItem('jwt');
        if (jwt) {
            config.headers["Authorization"] = `Bearer ${jwt}`;
        }
        return config;
    });

    $axios.onError(error => {
        if (error.response.data.error && error.response.data.error.message) {
            app.$toast.error(`Error: ${error.response.data.error ? error.response.data.error.message : error.response.data}`);
        }
    })
}
