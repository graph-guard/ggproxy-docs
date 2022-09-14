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

You can now send GraphQL queries to `http://localhost:8000/starwars` using `POST` requests as described at [GraphQL - Serving over HTTP](https://graphql.org/learn/serving-over-http/#post-request).

Down below you can find a few ready to go query examples:

<details>
<summary>Example 1</summary>

<span style="font-size:1.5em;">GraphQL</span>
```graphql
query X {
  hero(episode: NEWHOPE) {
    id
    name
    friends {
      id
      name
    }
  }
}
```
<span style="font-size:1.5em;">curl</span>
```bash
curl 'http://localhost:8000/starwars' -H 'content-type: application/json' --data '{"query":"query X {hero(episode: NEWHOPE) {id name friends {id name}}}","variables":{},"operationName":"X"}'
```
</details>

<details>
<summary>Example 2</summary>

<span style="font-size:1.5em;">GraphQL</span>
```graphql
query X {
  hero(episode: EMPIRE) {
    id
    name
    appearsIn
    friends {
      id
      name
      appearsIn
      friends {
        id
        name
        appearsIn
      }
    }
  }
}
```
<span style="font-size:1.5em;">curl</span>
```bash
curl 'http://localhost:8000/starwars' -H 'content-type: application/json' --data '{"query":"query X {hero(episode: EMPIRE) {id name appearsIn friends {id name appearsIn friends {id name appearsIn}}}}","variables":{},"operationName":"X"}'
```
</details>

<details>
<summary>Example 3</summary>

<span style="font-size:1.5em;">GraphQL</span>
```graphql
query X {
  hero(episode: JEDI) {
    id
    name
    appearsIn
    friends {
      id
      name
      appearsIn
      friends {
        id
        name
        appearsIn
      }
    }
    friendsConnection(first: 0, after: "MTAwMA==") {
      totalCount
      friends {
        id
        name
        appearsIn
      }
    }
  }
}
```
<span style="font-size:1.5em;">curl</span>
```bash
curl 'http://localhost:8000/starwars' -H 'content-type: application/json' --data '{"query":"query X {hero(episode: JEDI) {id name appearsIn friends {id name appearsIn friends {id name appearsIn}} friendsConnection(first: 0, after: \"MTAwMA==\") {totalCount friends {id name appearsIn}}}}","variables":{},"operationName":"X"}'
```
</details>

<details>
<summary>Example 4</summary>

<span style="font-size:1.5em;">GraphQL</span>
```graphql
query X {
  hero(episode: JEDI) {
    id
    name
    appearsIn
    friends {
      id
      name
      appearsIn
    }
  }
  reviews(episode: JEDI) {
    stars
    commentary
    time
  }
}
```
<span style="font-size:1.5em;">curl</span>
```bash
curl -X POST 'http://localhost:8000/starwars' -H 'content-type: application/json' --data '{"query":"query X {hero(episode: JEDI) {id name appearsIn friends {id name appearsIn}} reviews(episode: JEDI) {stars commentary time}}","variables":{},"operationName":"X"}'
```
</details>

Here is an example of what you're about to see:
![`curl 'http://localhost:8000/starwars' -H 'content-type: application/json' --data '{"query":"query X {hero(episode: NEWHOPE) {id name friends {id name}}}","variables":{},"operationName":"X"}'`](/quickstart_query.png)

You can also access the API Playground under `http://localhost:8080`, which grants you direct unrestricted access to the API bypassing `ggproxy`.

Feel free to change or add your own configuration and restart the server to see changes.
