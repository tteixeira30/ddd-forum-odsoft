
import Users from "./endpoints/Users";

let users: Users;

let accessToken: string;
let refreshToken: string;

describe("ddd-forum endpoint", (): void => {
  beforeAll(async (): Promise<void> => {
    users = new Users();
    
    console.log("1. Users Base url: " + users.getBaseUrl());
  });
  it("Post Login", async (): Promise<void> => {
    const response = await users.postLogin();
    expect(response.status).toBe(200);
    
    
    expect(response.data.accessToken).toBeDefined();
    expect(response.data.refreshToken).toBeDefined();

    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;

    /* 
    expect(response.data.icon_url).toBeDefined();
    expect(response.data.id).toBeDefined();
    expect(response.data.updated_at).toBeDefined();
    expect(response.data.url).toBeDefined();
    expect(response.data.value).toBeDefined();
    expect(response.data.value).toContain("Chuck Norris");
    */
  });

  it("Get Me", async (): Promise<void> => {
    console.log("Access token: " + accessToken);

    const response = await users.getMe(accessToken);
    expect(response.status).toBe(200);
    
    
    expect(response.data.user).toBeDefined();
    expect(response.data.user.username).toBeDefined();
    expect(response.data.user.username).toContain("atb");
    /*

    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;
    */

    /* 
    expect(response.data.icon_url).toBeDefined();
    expect(response.data.id).toBeDefined();
    expect(response.data.updated_at).toBeDefined();
    expect(response.data.url).toBeDefined();
    expect(response.data.value).toBeDefined();
    expect(response.data.value).toContain("Chuck Norris");
    */
  });  
});