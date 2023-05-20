/**
 *
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
*/
import { Logger } from "tslog";
import ConfigHandler from "./config/ConfigHandler";

import Users from "./endpoints/Users";

const config = ConfigHandler.getInstance();
const log = new Logger({
  minLevel: config.environmnetConfig.log_level,
  dateTimeTimezone:
    config.environmnetConfig.time_zone ||
    Intl.DateTimeFormat().resolvedOptions().timeZone,
});

let users: Users;

let accessToken: string;
let refreshToken: string;

describe("ddd-forum endpoint", (): void => {
  beforeAll(async (): Promise<void> => {
    users = new Users();
    
    log.debug("1. Users Base url: " + users.getBaseUrl());
    //console.log("1. Users Base url: " + users.getBaseUrl());
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
    log.debug("Access token: " + accessToken);
    //console.log("Access token: " + accessToken);

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