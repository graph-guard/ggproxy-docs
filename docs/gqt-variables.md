# GQT Variables

GQT allows you to associate individual input object fields and input parameters with variable names using the `<parameter>/<obj_field> = $variableName` syntax to allow for dynamic constraint checking.

GQT Variables should not be confused with GraphQL variables!
Variables are scoped within one template and must be unique across the template.

## Example

To limit the amount of nodes a client can ask for in 1 request to `100` we can assign variable names to the `limit` parameters and refer to their dynamic runtime values
in constraint expressions.

```
query {
    # Limit the total number of requestable nodes
    # to 100 (99 + the user node) with a maximum query depth of 3.
    user(id: *) (
        name
        friends(limit=$L1: <= 99) {
            name
            friends(limit=$L2: <= 99 / $L1) {
                name
                friends(limit: <= 99 / $L1 / $L2) {
                    name
                }
            }
        }
    )
}
```

The template above will allow any of the following operations to **pass**:

```graphql
query {
    user(id: "alice") {
        # OK: 100 nodes requested.
        friends(limit: 99) {
            name
        }
    }
}
```

```graphql
query {
    user(id: "alice") {
        friends(limit: 33) {
            name
            # OK: 3 * 33 = 99 nodes requested
            # which doesn't exceed the limit of 99.
            friends(limit: 3) {
                name
            }
        }
    }
}
```

```graphql
query {
    user(id: "alice") {
        # OK: 3*3*3=27 nodes at maximum allowed depth.
        friends(limit: 3) {
            name
            friends(limit: 3) {
                name
                friends(limit: 3) {
                    name
                }
            }
        }
    }
}
```

The following operations will be **rejected**:

```graphql
query {
    user(id: "alice") {
        friends(limit: 33) {
            name
            # ERR: 10 * 33 = 330 nodes
            # which exceeds the limit of 99.
            friends(limit: 10) {
                name
            }
        }
    }
}
```

```graphql
query {
    user(id: "alice") {
        friends(limit: 2) {
            name
            friends(limit: 2) {
                name
                # ERR: 2 * 2 * 100 = 400 nodes requested
                # which exceeds the limit of 99.
                friends(limit: 100) {
                    name
                }
            }
        }
    }
}
```

```graphql
query {
    user(id: "alice") {
        friends(limit: 1) {
            name
            friends(limit: 1) {
                name
                friends(limit: 1) {
                    name
                    # ERR: too deep.
                    friends(limit: 1) {
                        name
                    }
                }
            }
        }
    }
}
```
