# GQT Document Structure

Each template document consists of a `query`, `mutation`, or `subscription` definition resembling a GraphQL operation.

```
query {
    fruits {
        apples
        oranges
        bananas
    }
}
```

The template above will allow any of the following operations to **pass**:

```graphql
# OK: exact match
{ fruits { apples, oranges, bananas } }
```

```graphql
# OK: exact match (order doesn't matter)
{ fruits { bananas, apples, oranges } }
```

```graphql
# OK: subquery
{ fruits { bananas } }
```

```graphql
# OK: fragmented subquery
query { ...f }
fragment f ... on Query { fruits { bananas } }
```

The following operations will be **rejected**:

```graphql
# ERR: forbidden field fruits.cherries
{ fruits { apples, oranges, bananas, cherries } }
```

```graphql
# ERR: forbidden field vegetables
{ vegetables { cucumber } }
```

## Document Metadata

Documents can be annotated using frontmatter YAML:

```
---
name: Display Name
tags:
    - first_tag
    - second_tag
---
query {
    fruits {
        apples
        oranges
        bananas
    }
}
```
