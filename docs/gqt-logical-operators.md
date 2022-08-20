# GQT Logical Operators

GQT supports logical AND (`&&`) and OR (`||`) operators as well as parentheses allowing more complex logical constraints, for example: `val == 1 || (val >= 5 && val <= 10)`.

## Precedence

The operator precedence is ordered as follows:

1. Parentheses `()`
2. AND `&&`
3. OR `||`

## Example

```
mutation {
    createPost(
        title: val == "special" ||
            (bytelen >= 32 && bytelen <= 64),
        category: val == "sports" ||
            val == "music" ||
            val == "science"
    ) {
        id
    }
}
```

The template above will allow any of the following operations to **pass**:

```graphql
mutation {
    createPost(
        # OK: title matches val == "special"
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
