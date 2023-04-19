


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

### Built with

#### Backend

- [Sequelize](https://github.com/sequelize/sequelize) - The ORM for Node.js
- [Express.js](https://expressjs.com/) - Lightweight webserver
- [Redis](https://redis.io/) - For holding onto JWT tokens and refresh tokens

#### Frontend

- [React.js](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Sass](https://sass-lang.com/)

### Architecture

We built this based on the [Clean Architecture](https://khalilstemmler.com/articles/software-design-architecture/organizing-app-logic/), [SOLID principles](https://khalilstemmler.com/articles/solid-principles/solid-typescript/), and [Domain-Driven Design](https://khalilstemmler.com/articles/domain-driven-design-intro/) best practices using TypeScript.

#### Clean architecture

There's obviously a lot that went into building this from front to back.

The **Clean Architecture** is a way to reason about where different types of application logic belongs. 

<img width="1586" alt="Frame 8 (1)" src="https://user-images.githubusercontent.com/6892666/66703014-dc540e80-ecdb-11e9-81ac-9cc24e28f8c3.png">


There's a lot more to learn about the clean architecture, but for now- just know that it's a way to really separate the concerns of everything that goes into building complex enterprise applications. You'll never see any `infrastructure`-related code alongside `domain` layer code.

The clean architecture, when combined with Domain-Driven Design, is very powerful :) 

In DDD, we build applications on top of a number of subdomains.

##### Subdomains

> A _subdomain_ is a cohesive unit of code that represents exactly one core concept and is responsible for a specific set of concerns in an application architecture. For example, every appliciation has a `users` subdomain. That's responsible for _users, identity & access management, authentication, authorization, etc_. Sometimes you don't want to build that yourself. Sometimes you can go with an off-the-shelf solution like [Auth0](https://auth0.com/). But there are subdomains in your application that you cannot simply outsource. These are the **family jewels**; the thing that's actually _novel_ about your app. This is the subdomain that no one (except you) can code. Know why? Because only _you_ have the domain knowledge to build it exactly the way that it should be built. You understand the domain. 

In DDDForum, we have 2 **subdomains**: The `users` subdomain and the `forum` subdomain.

<img width="855" alt="Frame 3 (1)" src="https://user-images.githubusercontent.com/6892666/66702871-4a97d180-ecda-11e9-9a80-19755dc1f0a9.png">

Each subdomain has a:

- `domain` layer: where the highest-level policy, domain objects, and domain rules belong (`user`, `email`, etc)
- `application` layer: where the use cases / features that utilize domain objects belong (`createUser`, `login`, etc)
- `adapter` layer: where we define abstractions so that `application` layer code can interact with `infrastructure` layer concepts, without actually requiring on `infrastructure` (because that would break the [dependency rule](https://khalilstemmler.com/wiki/dependency-rule/)). Here we write things like `IUserRepo` - repository adapter, `IJWTTokenService` - an abstraction of a cache (redis) that manages tokens, etc.
- `infrastructure` layer: where we create [concrete](https://khalilstemmler.com/wiki/concrete-class/) implementations of the abstractions from the `adapter` layer so that they can be spun up at runtime thanks to the power of polymorhpism :) (more on this later).

> If you haven't already, I recommend you read [this article](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/application-layer-use-cases/) on use cases and subdomains.

Let's identify some of the actual concepts that exist in each subdomain.

### `users` subdomain

In the` users` subdomain, we're only concerned with concepts that are related to authentication, roles, etc. Here are a few examples of classes and concepts that exist at each layer.

- `domain` layer: `user` ([aggregate root](https://khalilstemmler.com/articles/typescript-domain-driven-design/aggregate-design-persistence/)), `userEmail` ([value object](https://khalilstemmler.com/articles/typescript-value-object/)), `userCreated` ([domain event](https://khalilstemmler.com/articles/typescript-domain-driven-design/chain-business-logic-domain-events/)).
- `application` layer: `createUserUseCase` ([use case](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/application-layer-use-cases/)), `getUserByUserName` (use case).
- `adapter` layer: `IUserRepo` ([respository](https://khalilstemmler.com/articles/typescript-domain-driven-design/repository-dto-mapper/) interface adapter)
- `infrastructure` layer: `SequelizeUserRepo` (a concrete implementation of the IUserRepo), `UserDTO` ([data transmission objects](https://khalilstemmler.com/articles/typescript-domain-driven-design/repository-dto-mapper/)).

### `forum` subdomain

In the `forum` subdomain, we're only concerned with concepts that have to do with building a forum. You won't see any domain concepts from the `user` in `forum`. In the `forum` subdomain, the concept most equivalent to a `user`, is a `member`.

Here are a few examples of concepts from the `forum` subdomain.

- `domain` layer: `member`, `comment`, `post`, `postVote`, `commentVote`, `commentVotesChanged`
- `application` layer: `replyToComment`, `getMemberByUserName`,  `upvotePost`, `downvotePost`
- `adapter` layer: `ICommentRepo`, `IPostRepo`, `IMemberRepo`
- `infrastructure` layer: `SequelizeCommentRepo`, `SequelizePostRepo`, `SequelizeMemberRepo`

## Project visualization

Here's a large-scale visualization of the repo. As I put more time into the front-end, it may change a little bit.

![Visualization of this repo](./diagram.svg)

## Contributing

DDDForum is an open source project, and contributions of any kind are welcome! Open issues, bugs, and enhancements are all listed on the issues tab and labeled accordingly. Feel free to open bug tickets and make feature requests. Easy bugs and features will be tagged with the good first issue label.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://linkedin.com/in/anthonydenneulin"><img src="https://avatars3.githubusercontent.com/u/1647464?v=4" width="100px;" alt=""/><br /><sub><b>Anthony Denneulin</b></sub></a><br /><a href="https://github.com/stemmlerjs/ddd-forum/commits?author=denneulin" title="Code">💻</a></td>
    <td align="center"><a href="http://khalilstemmler.com/"><img src="https://avatars1.githubusercontent.com/u/6892666?v=4" width="100px;" alt=""/><br /><sub><b>Khalil Stemmler</b></sub></a><br /><a href="https://github.com/stemmlerjs/ddd-forum/commits?author=stemmlerjs" title="Code">💻</a> <a href="https://github.com/stemmlerjs/ddd-forum/issues?q=author%3Astemmlerjs" title="Bug reports">🐛</a> <a href="https://github.com/stemmlerjs/ddd-forum/commits?author=stemmlerjs" title="Documentation">📖</a> <a href="#infra-stemmlerjs" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-stemmlerjs" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://medium.com/@faisol.chehumar"><img src="https://avatars3.githubusercontent.com/u/30441151?v=4" width="100px;" alt=""/><br /><sub><b>Faisol Chehumar</b></sub></a><br /><a href="https://github.com/stemmlerjs/ddd-forum/commits?author=faisol-chehumar" title="Code">💻</a></td>
    <td align="center"><a href="https://trungtran.io/"><img src="https://avatars3.githubusercontent.com/u/22028884?v=4" width="100px;" alt=""/><br /><sub><b>Trung Tran</b></sub></a><br /><a href="#infra-ChunML" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

This project is licensed under the ISC License - see the [LICENSE.md](https://github.com/stemmlerjs/ddd-forum/blob/master/LICENCE.md) file for details

## More Documentation

from https://github.com/dyarleniber/typescript-ddd-forum

### Clean architecture

The **Clean Architecture** is a way to separate the concerns of everything that goes into building complex enterprise applications. You'll never see any `infrastructure`-related code alongside `domain` layer code.

![Clean Architecture](images/clean-architecture.png)

The Clean Architecture, when combined with Domain-Driven Design, is very powerful.
Using Domain-Driven Design patterns means that we're going to start our development journey by encoding the business rules within our domain models. The task is to define all the models, the relationships between them, the policies that govern when and how they can change, and make it virtually impossible to represent any illegal state.

Domain objects have zero dependencies and only create source code dependencies to other domain objects. Because of this, we can write tests to ensure that the business logic contained in entities, value objects, and domain services are correct, and we can expect these tests to run very fast.

It's challenging to implement Domain-Driven Design without some sort of Layered Architecture, as we need a way to isolate our domain layer from outer layer concerns like databases, controllers, web servers, etc.

Some references:

- [SOLID Principles](https://khalilstemmler.com/articles/solid-principles/solid-typescript)
- [SOLID Relevance](https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html)
- [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Clean Node.js Architecture + TypeScript](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/clean-nodejs-architecture)
- [Organizing App Logic with the Clean Architecture](https://khalilstemmler.com/articles/software-design-architecture/organizing-app-logic)
- [Flexible Error Handling](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/handling-errors-result-class)
- [Functional Error Handling](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/functional-error-handling)

### Domain-Driven Design

Domain-Driven Design is the approach to software development which enables us to translate complex problem domains into rich, expressive and evolving software.

References:

- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)
- [An Introduction to Domain-Driven Design](https://khalilstemmler.com/articles/domain-driven-design-intro)
- [Entities](https://khalilstemmler.com/articles/typescript-domain-driven-design/entities)
- [Value Objects](https://khalilstemmler.com/articles/typescript-value-object)
- [DTOs](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/use-dtos-to-enforce-a-layer-of-indirection)
- [Implementing DTOs, Mappers & the Repository Pattern](https://khalilstemmler.com/articles/typescript-domain-driven-design/repository-dto-mapper)
- [Aggregates](https://khalilstemmler.com/articles/typescript-domain-driven-design/aggregate-design-persistence)
- [Challenges in Aggregate Design](https://khalilstemmler.com/articles/typescript-domain-driven-design/domain-modeling-1)
- [Handling Collections in Aggregates](https://khalilstemmler.com/articles/typescript-domain-driven-design/one-to-many-performance)
- [How to Handle Updates on Aggregates](https://khalilstemmler.com/articles/typescript-domain-driven-design/updating-aggregates-in-domain-driven-design)
- [Event-Based Systems](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/why-event-based-systems)
- [Domain Events](https://khalilstemmler.com/blogs/domain-driven-design/where-do-domain-events-get-dispatched)
- [Decoupling Logic with Domain Events](https://khalilstemmler.com/articles/typescript-domain-driven-design/chain-business-logic-domain-events)
- [Use Cases](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/application-layer-use-cases)

## Planning the project

### Use-case driven design

Being use-case driven helps to make better estimates, write more direct and intentional code, and plan out the tests. It is the best way to spend no more time on a project than is necessary (knowing what dictates a project being functionally complete).
All applications can be thought of as a grouping of use cases. That's all apps are anyways.

A *use case* is a high-level way to document behavior that an actor performs within a system.

An *actor* is a role played by either a specific type of user or a system itself (automations and external systems can be actors too — think payment processors like Stripe).

For instance, if the domain is a forum application, an actor might be a `member`, and some of their use cases might be to `createPost`, `postComment`, `upvotePost`, and `getPopularPosts`.

> Role matters. When identifying actors, name them based on their role.
> Identifying actors in our systems by thinking about their role helps us determine what their responsibilities are, and more importantly, what they're not.

All applications can be thought of as a grouping of use cases. That's all apps are anyways.

> Use cases should follow the CQS (Command-Query Separation) principle: every operation should be either a command (something that changes the system) or a query (something that returns data from the system), but never both.
> Instead of design a user case like `createAndReturnPost` we'd ensure two separate code paths for writes and reads by designing `createPost` (the command) and `getPostById` (the query).

#### Use-case artifacts

##### Use case diagrams

Diagrams help to understand at a high-level what systems, actors, and use cases exist.

##### Use case reports

Reports can contain more details, they document the **functional requirements** and how the system should respond to different scenarios when the **preconditions** change.

In addition to documenting our use case itself, we can utilize preconditions and postconditions to document business logic and how the system should respond in various scenarios (Given-When-Then).
This is often enough information to translate it directly into failing BDD-style unit tests, and then write the code to make the tests pass.

For example:
> "Given an existing post that the member hasn't yet upvoted, when they upvote it, then the post's score should increase by one"

**Use case name:** Upvote Post.

**Precondition(s):** A Member exists. A Post created by a different member also exists. The Member hasn't yet upvoted the Post.

**Postcondition(s):** The Posts score increased by one.

A failing test case:
```typescript
let post: Post;
let member: Member;
let postService: PostService;
let existingPostVotes: PostVote[];

describe("A post the member hasn't upvoted", () => {
  beforeEach (() => {
    post = null;
    member = null;
    existingPostVotes = [];
  })

  it ("When upvoted, it should upvote the post's score by one", () => {
    // Start out with a failing test.
    let initialScore: number;
    post = Post.create(...);
    initialScore = post.score;
    member = Member.create(...);
    postService.upvotePost(existingPostVotes, member, post);

    // Should fail since we haven't written any logic yet
    expect(post.score).toEqual(initialScore + 1);
    expect(post.votes.getNewItems().length).toEqual(1)
  })
})
```

##### Steps to implement use cases

1. Identify the roles of the actors using the system.
   - For this app, we could start by identifying the roles: `Members`, `Visitors`, and `Admin`.
2. Understand their end goal(s).
   - The goal for someone interested in DDD might be that they "want a place to learn about DDD and get their questions answered" (that's a common goal for `Visitors` and `Members`).
   - For `Admin` users, their goal is to "ensure that the DDDForum community is welcoming, helpful, and respectful".
3. Identify the system(s) that need to be constructed in order to enable the actor(s) to meet their goals.
   - For example, a marketplace, an admin panel, a blog, a forum, a social network, etc.
   - In the DDDForum app, we'll start with a forum site for `Members` and `Visitors`.
   - For `Admin` users, the admin panel could exist to serve their moderation needs.
4. For each actor in each system, list out all the use cases involved in helping that actor meet their goal(s).

> [UML Use Case Diagram Tutorial](https://www.youtube.com/watch?v=zid-MVo7M-E&ab_channel=Lucidchart)

### Subdomains and Bounded Contexts

The biggest problem with use case diagrams is the lack of being able to represent architectural boundaries.
Using the Use Case format, it's challenging to do it in a way that does not become messy. Like this use case diagram without a good separation of concerns:

![Use Case Diagram without a good separation of concerns](images/use-cases-messy.svg)

What we need is a good way to represent the architectural boundaries and the use cases that belong to those boundaries within our system(s).
In Domain-Driven Design, the concept of **subdomains** is equivalent to these boundaries.

A **subdomain** is a cohesive unit of code that represents exactly one core concept and is responsible for a specific set of concerns in an application architecture. It is a smaller piece (logical boundary) within the entire problem space. Logically organizing code into subdomains is the first step, Bounded Contexts are what we actually deploy.

**Boundaries** is a logical boundary around all the subdomains needed in order for an application achieve its goals. We have two options for realizing our Bounded Contexts: Modular Monoliths and Distributed Micro-services.

In this case, we'll be using Modular Monoliths.

A Modular Monolith application is just a single Bounded Context with several Subdomains within it.
Each of the Subdomains for a one Bounded Context live within a single deployable unit.
If needed, we can break Subdomains into their own Bounded Contexts so that they can be managed and deployed as Distributed Micro-services.

> On new projects with a smaller team, it could be a good idea to start with a Modular Monolith instead of jumping to implementing Micro-services right away.

A monolithic application enables both the `Users` and `Forum` subdomains to live within the same codebase but from within separate modules.

In DDD, the way that subdomains or bounded contexts communicate with each other is through the publishing and subscribing of Domain Events.
In this project, we'll implement an In-Memory Domain Events Queue.

> Using Domain Events as the primary mechanism for messaging is an excellent way to foster loose coupling between modules.

> In a real-world micro-service deployment, Domain Events get published to a queue and sent out across the network to subscribers.

To discover the subdomains, all we have to do is think about the different teams that we could assemble to take ownership over a specific part of the business.
And if we know the teams (`subdomains` like `users`, `forum`, `notifications`), then every domain concept like an actor/role (and their use cases) belongs to a subdomain. We're going to organize all the `actors` and their `use cases` into subdomains.


In 1967, Melvin Conway, a computer scientist, was credited with the following quote with respect to designing systems:
> "Organizations which design systems are constrained to produce designs which are copies of the communication structures of these organizations".

Conway's law dictates architectural boundaries, which informs architects how to split an application into either distributed micro-services (micro-services split up and networked together) or a modular monolith (several subdomains well-separated within one deployable unit of code).

Here's an illustration of the influence Conway's Law has on architecture:

![Conway's Law](images/conways-law.svg)

In DDDForum, There is a `forum` subdomain, which appears to be our core subdomain that allows us to focus on `posts`, `comments`, `votes`, and such - an essential part of our application.
There's also a generic `users` subdomain which takes care of all of our identity and access management for `users`.
As well, the primary actor in the `forum` is the `member`, while the primary actor of the `users` subdomain is the `user`.
We might also have one more subdomain for `notifications`.

![Subdomains](images/subdomains.png)

Each subdomain has a:

- `domain` layer: where the highest-level policy, domain objects, and domain rules belong (`user`, `email`, etc)
- `application` layer: where the use cases / features that utilize domain objects belong (`createUser`, `login`, etc)
- `adapter` layer: where we define abstractions so that `application` layer code can interact with `infrastructure` layer concepts, without actually requiring on `infrastructure` (because that would break the dependency rule). Here we write things like `IUserRepo` - repository adapter, `IJWTTokenService` - an abstraction of a cache (redis) that manages tokens, etc.
- `infrastructure` layer: where we create concrete implementations of the abstractions from the `adapter` layer so that they can be spun up at runtime thanks to the power of polymorphism.

Some actual concepts that exist in each subdomain:

#### `users` subdomain

In the` users` subdomain, we're only concerned with concepts that are related to authentication, roles, etc. Here are a few examples of classes and concepts that exist at each layer.

- `domain` layer: `user` (aggregate root), `userEmail` (value object), `userCreated` (domain event).
- `application` layer: `createUserUseCase` (use case), `getUserByUserName` (use case).
- `adapter` layer: `IUserRepo` (repository interface adapter).
- `infrastructure` layer: `SequelizeUserRepo` (a concrete implementation of the IUserRepo), `UserDTO` (data transmission objects).

#### `forum` subdomain

In the `forum` subdomain, we're only concerned with concepts that have to do with building a forum. You won't see any domain concepts from the `user` in `forum`. In the `forum` subdomain, the concept most equivalent to a `user`, is a `member`.

Here are a few examples of concepts from the `forum` subdomain.

- `domain` layer: `member`, `comment`, `post`, `postVote`, `commentVote`, `commentVotesChanged`
- `application` layer: `replyToComment`, `getMemberByUserName`,  `upvotePost`, `downvotePost`
- `adapter` layer: `ICommentRepo`, `IPostRepo`, `IMemberRepo`
- `infrastructure` layer: `SequelizeCommentRepo`, `SequelizePostRepo`, `SequelizeMemberRepo`

We're also going to use CQRS (Command Query Response Segregation).
Taking it one step further than the CQS (Command-Query Separation) pattern, CQRS implies that we have separate models for reading and writing.
That is, for a `Post` aggregate, we have one write model and at least one read model opposed to having only one model responsible for both operations.

Here's the database schema of DDDForum:

> We're going to leave out the admin and admin panel for now.

![Database schema](images/database-schema.svg)

And here's the use case diagram:

![Use case diagram](images/use-cases-refactored.svg)

While we could call everyone a `User`, that could be unproductive to the ubiquitous language. There is a time and place to call a user a `User`, such as in an Identity & Access Management / Authentication context.

**Role matters.** We should now understand that the `register` and `log in` use cases are not significant to a `Member` or `Visitor`, but they are significant to a `User`.

- [Software Design with Application Layer Use Cases](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/application-layer-use-cases/)

### Some other approaches to planning a project and exploring complex business domains

#### Event Storming

Using use case diagrams is appropriate when we understand the domain, and we're ok with doing the majority of the use case modeling work in isolation, away from domain experts.

However, it can be risky for developers to spend design time alone since we know that it's the initial design of a project that has the potential to have the most profound impact on the overall quality of the system.
There must be a design tool that involves both the developers and the domain experts in this process.
There is, and it's called Event Storming.

Event Storming is a group or workshop-based modeling technique that brings stakeholders and developers together in order to understand the domain quickly.

- [Event Storming](https://khalilstemmler.com/articles/graphql/ddd/schema-design/#Event-Storming)
- [Event Storming 101](https://www.lucidchart.com/blog/ddd-event-storming)

#### Event Modeling

It's more of a formalization of all the knowledge from 2003-2018 revolving around DDD and event-based systems.

- [Event Modeling](https://eventmodeling.org)

### Some useful information to have before starting a project includes

- An Event Stormed model created that identified all the events, commands, queries, aggregates, and views.
- Several of the policies/business rules thought out and identified that would affect how and when specific commands and events occur.
- Wireframes created with Figma to verify the exact attributes that we'd need on each model.
