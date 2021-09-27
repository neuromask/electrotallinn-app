export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    let jwt = localStorage.getItem('jwt');
    if (jwt) {
      config.headers["Authorization"] = `Bearer ${jwt}`;
    }
    return config;
  });

  // $axios.onError(error => {
  //   const code = parseInt(error.response && error.response.status);
  //   if (code === 400) {
  //     redirect('/400')
  //   }
  // })
}
