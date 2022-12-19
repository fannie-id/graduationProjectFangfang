import axios from "axios";

const deedsPath: string = "/api/deeds"

export function getDeeds(){
    return axios.get(deedsPath)
        .then(response=>response.data)
}
