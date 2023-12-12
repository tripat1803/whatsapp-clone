import axios from "axios";

export const Api = axios.create({
    baseURL: "http://192.168.29.14:4000"
});
// export const Api = axios.create({
//     baseURL: "http://localhost:4000"
// });