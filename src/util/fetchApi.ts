import axios from "axios";
import { FetchParam } from "../lib/types";

export const fetchAPI = async (options: FetchParam) => {

    const response = await axios.get(options.url, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${options?.accessToken}`
        }
    });
    const { data } = response;
    return data  

}