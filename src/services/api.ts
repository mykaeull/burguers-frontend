import axios from "axios";

const api = axios.create({
    baseURL: "https://cdn-dev.preoday.com/",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export default api;
