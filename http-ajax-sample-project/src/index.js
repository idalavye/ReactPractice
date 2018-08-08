import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';


axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common['Authorization'] = "AUTH TOKEN";
axios.defaults.headers.post['Content-Type'] = "application/json";

/**
 * Bu şekilde bir kullanımda uygulamamızdaki tüm requestler aşağıdaki interceptor'den
 * geçecektir. Ve eğer return etmezsek hiçbir şekilde sunucuya istek atmayacaktır.
 */

axios.interceptors.request.use(request => {
    console.log(request);
    return request; 
}, error => {
    console.log(error); //Global olarak hata loglamak istersek kullanabiliriz.
    return Promise.reject(error);//axis metotlarının catch metotlarının yakalaması için hatayı return yapıyoruz.
});

axios.interceptors.response.use(response => {
    console.log(response);
    return response; 
}, error => {
    console.log(error);
    return Promise.reject(error);
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
