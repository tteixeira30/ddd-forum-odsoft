import { AxiosResponse } from "axios";

import { AAPIEndpoint } from "./abstracts/AAPIEndpoint";
 
export default class Posts extends AAPIEndpoint {
  constructor() {
    super("/posts", "posts");
  }

  public async getPopularPosts(): Promise<AxiosResponse> {
    return this.restClient.sendGet({ route: "/popular" });
  }
}
