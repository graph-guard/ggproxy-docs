# Quick Start Guide

This example will help you quickly get started using the Star Wars example from [github.com/99designs/gqlgen](https://github.com/99designs/gqlgen), a popular GraphQL library and code generator for Go.[](https://github.com/99designs/gqlgen)

## Prepare

1. Install the latest stable version of `ggproxy` ([see installation guide](/installation)).
2. Clone the [Star Wars example repository](https://github.com/graph-guard/ggproxy-examples):
```bash
git clone git@github.com:graph-guard/ggproxy-examples.git && cd ggproxy-examples/starwars
```
3. Run the StarWars GraphQL API server:
```bash
go run ./server/server.go
```
4. Use the Open Beta 1 license token:
```bash
export GGPROXY_LICENSE="eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjcyNjA3OTksImlhdCI6MTY2MTUyODMzMSwic3ViIjoiNTMxYTljYTYtYTJhYi00ZmE2LWJlYzktYjg1N2UxYzZhOWQ2IiwidHlwZSI6MCwicGxhbiI6NH0.AI6EyunP3mdd2FOYqDqdl2-QPoyF0UF7K_BnT-0tNJnnSW4xmqvdnkdB4eDe4EkmF5y0DVohgVqWc9jBVQ2U7xA-APFBzNB15TsbU7c3BaS2PfNB6wJm2ckXRudfZHMvor_GqcDmPMGTNAeuyROJnFuSkLnR-cDYpM7fXtpMmwpzgih3"
```

5. Run ggproxy:
```bash
ggproxy serve -config ./config
```

## Play

You can now send GraphQL queries to <a href="http://localhost:8000/starwars">http://localhost:8000/starwars</a> using `POST` requests as described at [GraphQL - Serving over HTTP](https://graphql.org/learn/serving-over-http/#post-request):

![`curl -X POST -H 'content-type: application/json' --data '{"query": "query Example {hero(episode: NEWHOPE) {id name friends { id name appearsIn } appearsIn }}", "variables": {}, "operationName": "Example"}' http://localhost:8000/starwars`](/quickstart_query.png)

```bash
curl -X POST -H 'content-type: application/json' --data '{"query": "query Example {hero(episode: NEWHOPE) {id name friends { id name appearsIn } appearsIn }}", "variables": {}, "operationName": "Example"}' http://localhost:8000/starwars
```

You can also access the API Playground under <a href="http://localhost:8080">http://localhost:8080</a>, which grants you direct unrestricted access to the API bypassing `ggproxy`.

Feel free to change the configuration and restart the server to see changes.
