import axios from 'axios';
import promise from 'promise';

// Add a request interceptor 
var proxy = axios.create();

proxy.interceptors.request.use(function (config) {
    // // Do something before request is sent 
    // //If the header does not contain the token and the url not public, redirect to login  
    // var accessToken = getAccessTokenFromCookies();

    // //if token is found add it to the header
    // if (accessToken) {
    //     if (config.method !== 'OPTIONS') {
    //         config.headers.authorization = accessToken;
    //     }
    // }
    config.headers['If-Modified-Since'] = null;
    return config;
}, function (error) {
    // Do something with request error 
    return promise.reject(error);
});


// const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
// axios.interceptors.request.eject(myInterceptor);

export default proxy;