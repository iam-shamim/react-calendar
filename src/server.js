import axios from 'axios'
const instance = axios.create({
    proxy: 'http://localhost:3000'
});

export default instance;