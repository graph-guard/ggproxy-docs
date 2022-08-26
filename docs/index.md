# GraphGuard Proxy

GraphGuard Proxy (a.k.a. "ggproxy") is a high-performance [GraphQL](https://graphql.org) proxy protecting your GraphQL server from [maliciously-complex queries](/faq#what-problem-does-ggproxy-solve) using a query template whitelist. "ggproxy" sits between the internet and your GraphQL server and allows you to define a whitelist of explicitly allowed queries, mutations and subscriptions while blocking any GraphQL requests that don't match against it.

![asd](/ggproxy_proxy_visualization.svg)

The template whitelist is defined using the [GraphQL Template Language (GQT)](/gqt).

A single GraphGuard Proxy instance can host multiple services, each having its own whitelist and forwarding parameters.

## Community

We are maintaining the following community chats:
- [Telegram](https://t.me/graphguard)
- [Discord](https://discord.gg/PmWpQcE4KM)
- [GitHub Discussions](https://github.com/graph-guard/ggproxy-docs/discussions)

GraphGuard Proxy is commercial closed source software, but it will always remain free for non-commercial open source projects ❤️
