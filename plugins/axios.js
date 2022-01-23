export default function ({$axios, redirect, app}) {
    $axios.onRequest(config => {
        if (config.url.startsWith(app.$config.apiUrl)) {
            let jwt = localStorage.getItem('jwt');
            if (jwt) {
                config.headers["Authorization"] = `Bearer ${jwt}`;
            }
        }
        return config;
    });

    $axios.onError(error => {
        if (error.response.data.error) {
            app.$toast.error(app.i18n.t(error.response.data.error, error.response.data.params || []));
        }
    })
}
