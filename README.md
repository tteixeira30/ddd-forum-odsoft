


<p align="center">
 <img src="https://user-images.githubusercontent.com/6892666/67032637-fc237200-f0e1-11e9-8a46-f5d655e71962.png"/>
</p>
<h1 align="center">DDDForum.com</h1>

<p align="center">
 <a href="https://circleci.com/gh/stemmlerjs/ddd-forum"><img src="https://circleci.com/gh/circleci/circleci-docs.svg?style=svg"></a>
 <a href="#contributors"><img src="https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square"></a>
</p>

> A [SOLID](https://khalilstemmler.com/articles/solid-principles/solid-typescript/) hackernews-inspired forum site built with TypeScript using the [clean architecture](https://khalilstemmler.com/articles/software-design-architecture/organizing-app-logic/) and [DDD best practices](https://khalilstemmler.com/articles/domain-driven-design-intro/).

![DDDForum](https://user-images.githubusercontent.com/6892666/67032446-9931db00-f0e1-11e9-894d-7bccd240c851.png)

## About 

DDDForum.com is the application that we build in [solidbook.io - The Software Design and Architecture Handbook](https://solidbook.io). 

## Switch-QA Team's Project Technical Documentation  

You may find a template for the project technical documentation in [docs/readme.md](docs/readme.md)
You should follow this examples as a template for your own work.
## Documentation

[Original Readme file](README-original.md)

[Readme file from dyarleniber](README-dyarleniber.md)


## Running the project

1. Install and start [Docker](https://docs.docker.com/compose/gettingstarted/) if you haven't already.
2. Copy the `.env` template file. Feel free to change passwords and app secrets. 

```bash
cp .env.template .env
```

3. Build and run the image to run the backend services.

```bash
docker-compose up
```

4. Open up an additional console and then run:

```bash
npm run setup:dev
npm run start:both
```

You can visit the app by going to `http://localhost:3000`.

### Demo 

[You can visit the site here](https://dddforum.com).

> `Note`: It's currently deployed on free tier Heroku, which has some undesirable side-effects like shutting off the server during periods of inactivity. So if it's down for you, refresh a couple of times. Thinking about migrating this to a serverless architecture later on.

## Technical Notes (ISEP)

### Tool Dependencies - Very Important!

  This project requires the following tools to be present in your system.

  **Use node version 12.22.12**

  The use of this node version is mandatory
  You an use **nvm** to manage several node version in your system (see https://github.com/nvm-sh/nvm)

  **Python**
  You may have to install **python v2.7** in your system (see https://www.python.org/)
### Using the API

Examples of using the API (without authentication, using postman)

  - Get popular posts:
  GET http://localhost:5001/api/v1/posts/popular

  - Get new posts:
  GET http://localhost:5001/api/v1/posts/recent

  - Get post by slug:
  GET http://localhost:5001/api/v1/posts/?slug=9526372-gosto-muito-de-dd

  - Get comments by slug:
  GET http://localhost:5001/api/v1/comments/?slug=9526372-gosto-muito-de-dd

  - Login
  POST http://localhost:5001/api/v1/users/login
  body:
  {
    "username": "user",
    "password": "password"
  }
  return:
  {
    "accessToken": "...",
    "refreshToken": "..."
  }
  You can then use the "accessToken" for actions that require authentication, by passing the value of the accessToken in a header named "Authentication". For example:
  - Get Me
  GET http://localhost:5001/api/v1/users/me
    Headers[
      ...
      Autorization: accessToken
    ]
  Response:
  {
    "user": {
        "username": "atb",
        "isEmailVerified": false,
        "isAdminUser": false,
        "isDeleted": false
    }
  }

### How to Admin da database
  
  - open browser use localhost:8080
  - use:
    - server name: mysql
    - username: tonysoprano
    - pass: 12345678
    - db name: data_dev

### How to Run Tests

  To run tests type: npm run test

  Existing tests:
  - src/shared/core/Guard.spec.ts
  - src/modules/forum/domain/postSlug.spec.ts
  - src/modules/forum/domain/services/postService.spec.ts

  The existing tests verify some services in the domain layer. The domain layer has no dependency on the other layers, so there is no need for mocking. The tests can be executed without any dependencies (e.g., database, etc.)

### How to Debug

  - start the services with *docker-compose up*
  - To debug the backend in VSCode execute the launch.json (*.vscode/launch.json*)
  - start the front-end with *npm run  start:public*
  - open in browser: *localhost:3000*
 
 
