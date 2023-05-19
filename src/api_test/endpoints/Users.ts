import { AxiosResponse } from "axios";

import { AAPIEndpoint } from "./abstracts/AAPIEndpoint";
 
export default class Users extends AAPIEndpoint {
  constructor() {
    super("/users", "users");
  }

  public async postLogin(): Promise<AxiosResponse> {
    return this.restClient.sendPost({ route: "/login", data: { username: "atb", password: "atbatb" } });
  }

  public async getMe(accessToken: string): Promise<AxiosResponse> {
    return this.restClient.sendGet({ route: "/me", headers: { "Authorization": accessToken, "Accept": "application/json",
    "Content-Type": "application/json" } } );
  }  
}
