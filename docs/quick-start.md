# Quick Start Guide

Quickly get started with the StarWars example based on [github.com/99designs/gqlgen](https://github.com/99designs/gqlgen).

1. [Install the latest stable version of ggproxy](/installation).
2. Clone the [StarWars example repository](https://github.com/graph-guard/ggproxy-examples):
```bash
git clone git@github.com:graph-guard/ggproxy-examples.git && cd ggproxy-examples
```
3. Run the StarWars GraphQL API server.
```bash
go mod tidy && go run ./server/server.go
```
4. Run ggproxy.
```bash
GGPROXY_LICENSE=... ggproxy serve -config ./config
```
- Start playing and have fun ❤️