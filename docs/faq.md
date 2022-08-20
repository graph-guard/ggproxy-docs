# FAQ

## What problem does ggproxy solve?

**Long story short**: ggproxy protects your GraphQL API from overwhelmingly complex queries by allowing you to explicitly define what queries, mutations and subscriptions are allowed to pass through.

GraphQL's loose coupling between API clients and the backend comes at the cost of predisposition to [Denial-of-Service attacks](https://en.wikipedia.org/wiki/Denial-of-service_attack).

```graphql
query {
    user(id: "alice") {
        friends {
            id
            friends {
                id
                friends {
                    id
                    friends {
                        id
                    }
                }
            }
        }
    }
}
```

If we assume that every user has ~100 friends on average, then the above query could result in `100*100*100*100=100'000'000` database queries and a response JSON size of approximately 1.6 GB. The computational complexity of requests of this kind can grow exponentially and easily overwhelm even the most powerful of servers.
GraphQL APIs exposed to the internet must therefore be protected from maliciously-complex queries!

There are several protection techniques:
- Query Complexity Analysis.
- Execution Time Limitation.
- Execution Resource Limitation.
- Query Whitelisting.

Different approaches all have their pros and cons. However, before ggproxy query whitelisting wasn't feasible because comparing incoming queries byte-by-byte isn't practical due to the fact that they enforce a particular query structure while GraphQL queries can be composed differently and also require all combinations of inputs to be hard-coded.

Using its flexible templating language and fast matching algorithms, ggproxy revolutionizes query whitelisting and allows for more GraphQL adoption across different industries and project!

## Why not just use RPC/REST/etc. instead?

One of GraphQL's key strengths is that it allows your frontend and backend to iterate mostly independently of each other due to loose coupling. RPC-like approaches to API design (e.g., REST) can lead to tight coupling, which has both up- and downsides. The biggest downside of tight coupling between your clients and your API is that you have to introduce changes to the code of the backend API every time frontend requirements change. With ggproxy you get the resilience of tight coupled RPC and the flexibility of loosely coupled GraphQL because no code needs to be changed on the backend, only the whitelist needs to be updated to cover new data requirements of the client.

Imagine the following REST API in late stages of development:
```
GET /users/:id -> ?{
    name: String,
    email: String,
    birthDate: ?String
}

GET /users -> [{
    name: String,
    email: String
}]

GET /userProfileMobile/:id -> {
    avatar: URL,
    recentDiscussions: [{id: String, title: String, update: Time}],
    friends: {id: String, name: String, avatar: URL}
}
```
The `/userProfileMobile` endpoint was introduced to reduce the loading time of the user profile view on mobile devices. It returns all data necessary to display this particular view.

**Problem**:
If the mobile app development team...
- ...wants to also display the recent likes on the mobile user profile view, then the backend code will need to change.
- ...decides to add a new view with different data, then the backend code will also need to change.

If the backend and frontend teams use GraphQL with ggproxy then the mobile app team could just change their GraphQL queries and ask the backend team to whitelist them. This reduces the amount of work the backend team has to do to allow the mobile app team to iterate.

Read more [on why you might need GraphQL](https://graphql.org/faq/#why-should-i-use-graphql).

## Why not use Query Complexity Analysis instead?

Query Complexity Analysis (QCA) is a wide-spread method of protection.

There are several downsides to QCA compared to a query whitelist:
- The complexity score can't be computed while parsing the query and instead needs to be computed during execution. This wastes resources for over-budget queries. Even though more sophisticated QCA and other alternatives implementations (resource limitation, execution time limitation, etc.) could ban malicious clients on a per-IP basis, the whitelist approach remains less complicated and prevents resource wasting.
- QCA implementations can be rather unreliable and complex compared to a query whitelist because a complexity score needs to be estimated by the developers for each field individually.
- QCA doesn't allow for explicit input checks.

However, it should be noted that there are situations where QCA is the better solution, like when your API is supposed to be used by an undefined large number of clients that you don't control.

## Is learning a new templating language necessary?

[GQT](/gqt) was designed to closely resemble GraphQL queries and allow for intuitive definition of query templates.
Learning GQT should be intuitive and easy to anyone familiar with GraphQL.
Without templates, it would have been impossible to accept query, mutation, and subscription requests containing dynamic inputs.

## Does the licence permit personal and commercial usage?

GraphGuard Proxy is commercial closed source software, but it will always remain free for non-commercial open source projects ❤️.

For commercial projects, a license is required. Special conditions will apply to startup businesses.

Pricing will be available soon.
