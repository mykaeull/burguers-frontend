import axios from "axios";

const api = axios.create({
    baseURL:
        "https://cors-anywhere-7hvq.onrender.com/https://cdn-dev.preoday.com/",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
