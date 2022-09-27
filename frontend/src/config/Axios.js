import axios from 'axios';

const proto = 'http'; //Protocol web hhtp or https
const host =  'localhost'; //url or ip or localhost
const port = '3005'; // ports conection api

const conection = axios.create({baseURL:`${proto}://${host}:${port}`});

export default conection;