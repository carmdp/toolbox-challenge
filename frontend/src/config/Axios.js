import axios from 'axios';

const instance = axios.create({baseURL:"http://192.168.1.10:3005/"});
//const instance = axios.create({baseURL:"http://localhost:3005/"});
//const instance = axios.create({baseURL:"https://www.tizusoft.com.ar:3002/"});

export default instance;