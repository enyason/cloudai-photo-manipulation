import axios, {AxiosInstance} from 'axios';
import {API_KEY, BASE_URL, PROXY_SERVER_URL} from "../common/Constants.ts";
import {ReplicateAIModels} from "./CloudAiModels.ts";
import {RcFile} from "antd/lib/upload";
import {uploadImageToImgBB} from "./ImageHostingService.ts";
import {delay} from "../common/Utils.ts";

class ApiClient {
    private axiosInstance: AxiosInstance

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
                "Authorization": `Token ${API_KEY}`
            },
        })

        this.setUpPredictionStatusPolling()
    }

    private setUpPredictionStatusPolling() {
        this.axiosInstance.interceptors.response.use(async (response) => {
                console.log("Interceptor", response)

                const predictionId = response.data["id"]
                const predictionUrl = `predictions/${predictionId}`;

                let pollingStatus = response.data["status"]

                while (pollingStatus === "starting" || pollingStatus === "processing") {
                    await delay(3000)
                    response = await this.axiosInstance.get(predictionUrl)
                    pollingStatus = response.data["status"]
                    console.log("Interceptor polling status: ", pollingStatus)
                }

                return response;
            }, (error) => Promise.reject(error)
        )
    }

    public async generateImage(userPrompt: string): Promise<PredictionResponse> {
        const data = {
            "version": ReplicateAIModels.TextToImage,
            "input": {
                "prompt": userPrompt
            }
        };

        return await this.createPrediction(data)
    }

    public async removeBackgroundFromImage(image: RcFile) {

        const url = await uploadImageToImgBB(image)

        const data = {
            "version": ReplicateAIModels.BgRemover,
            "input": {
                "image": url
            }
        };

        return await this.createPrediction(data)

    }

    public async removeObjectFromImage(image: RcFile, objectToRemove: string) {

        const url = await uploadImageToImgBB(image)

        const data = {
            "version": ReplicateAIModels.ObjRemover,
            "input": {
                "image_path": url,
                'objects_to_remove': objectToRemove
            }
        };

        return await this.createPrediction(data)
    }

    public async restoreImage(image: RcFile) {

        const url = await uploadImageToImgBB(image)

        const data = {
            "version": ReplicateAIModels.FaceRestorer,
            "input": {
                "img": url,
                "scale": 1,
            }
        };

        return await this.createPrediction(data)
    }

    async createPrediction(data: object): Promise<PredictionResponse> {
        console.log('type is', typeof data)
        const response = await this.axiosInstance.post<PredictionResponse>("/predictions", data)
        return response.data
    }
}


const apiClient = new ApiClient(PROXY_SERVER_URL + BASE_URL)
export default apiClient

