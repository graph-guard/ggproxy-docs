# GQT Logical Operators

GQT supports logical AND `&&` and OR `||` operators as well as parentheses allowing more complex logical constraints, for example: `1 || (>= 5 && <= 10)` is the equivalent of "must be 1 or greater or equal 5 and less then or equal 10". The logical operator `&&` has a higher precedence than `||`.

## Example

```
mutation {
    createPost(
        title: "special" || (len >= 32 && len <= 64),
        category: "sports" || "music" || "science",
    ) {
        id
    }
}
```

The template above will allow any of the following operations to **pass**:

```graphql
mutation {
    createPost(
        # OK: title matches "special"
        title: "special",
        # OK: category is either "sports", "music", or "science"
        category: "music",
    ) { id }
}
```

The following operations will be **rejected**:

```graphql
mutation {
    createPost(
        # ERR: title must be at least 32 bytes long
        title: "wrong",
        category: "music",
    ) { id }
}
```

```graphql
mutation {
    createPost(
        title: "This is a very long example title",
        # ERR: category is neither
        # "sports", nor "music", nor "science"
        category: "finance",
    ) { id }
}
```
