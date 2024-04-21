import axios from "axios";
import { FetchParam, PostParam } from "../lib/types";

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

export const postData = async <T>(options: PostParam<T>) => {

    const response = await axios.post(
        options.url, 
        options.requestBody,
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${options?.accessToken}`
            }
    });
    const { data } = response;
    return data  
}

export const deleteData = async (options: FetchParam) => {

    const response = await axios.delete(
        options.url, 
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${options?.accessToken}`
            }
    });
    const { data } = response;
    return data  
}