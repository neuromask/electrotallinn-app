export default function ({$axios, redirect, app}) {
    $axios.onRequest(config => {
        let jwt = localStorage.getItem('jwt');
        if (jwt) {
            config.headers["Authorization"] = `Bearer ${jwt}`;
        }
        return config;
    });

    if (error.response.data.error) {
        $axios.onError(error => {
            app.$toast.error(`Error: ${error.response.data.error}`);
        })
    }
}
