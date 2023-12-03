interface PredictionResponse {
    id: string;
    model: string;
    version: string;
    input: {
        prompt: string;
    };
    logs: string;
    output: string[] | string;
    error: null | string;
    status: string;
    created_at: string;
    started_at: string;
    completed_at: string;
    urls: {
        cancel: string;
        get: string;
    };
    metrics: {
        predict_time: number;
    };
}

// {
//   "id": "gm3qorzdhgbfurvjtvhg6dckhu",
//   "model": "replicate/hello-world",
//   "version": "5c7d5dc6dd8bf75c1acaa8565735e7986bc5b66206b55cca93cb72c9bf15ccaa",
//   "input": {
//     "text": "Alice"
//   },
//   "logs": "",
//   "error": null,
//   "status": "starting",
//   "created_at": "2023-09-08T16:19:34.765994657Z",
//   "urls": {
//     "cancel": "https://api.replicate.com/v1/predictions/gm3qorzdhgbfurvjtvhg6dckhu/cancel",
//     "get": "https://api.replicate.com/v1/predictions/gm3qorzdhgbfurvjtvhg6dckhu"
//   }
// }