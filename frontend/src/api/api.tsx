import axios from "axios";

export function getDeeds(){
    return axios.get("/api/deeds")
        .then(response=>response.data)
}