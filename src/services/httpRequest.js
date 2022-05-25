import { axiosInstance } from "./initRequest";

class HTTPRequest {
  constructor() {
    this.api = axiosInstance;
  }

  async get(url, config) {
    return this.api.get(url, config);
  }

  async post(url, bodyData, config) {
    return this.api.post(url, bodyData, config);
  }
}

const httpRequest = new HTTPRequest();

export default httpRequest;
