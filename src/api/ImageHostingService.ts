import {RcFile} from "antd/lib/upload";
import axios from "axios";
import {IMG_BB_API_KEY} from "../common/Constants.ts";


export const uploadImageToImgBB = async (image: RcFile) => {
    try {
        const formData = new FormData();
        formData.append('image', image);

        const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
            params: {
                expiration: 600,
                key: IMG_BB_API_KEY,
            },
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });

        return response.data["data"]["image"]["url"]
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Request failed with status code:', error.response?.status);
            console.error('Response data:', error.response?.data);
        }
        throw "Error uploading image"
    }
}