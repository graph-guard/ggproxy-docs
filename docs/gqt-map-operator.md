# GQT Map Operator

The map operator (`...`) applies a constraint to all items of an array.

## Example

```
mutation {
    addNumbers(
        numbers: [... val < 100]
    )
}
```

The template above will allow any of the following operations to **pass**:

```graphql
mutation {
    # OK: all numbers are smaller 100
    addNumbers(numbers: [1, 2, 3, 4, 5, 6])
}
```

The following operations will be **rejected**:

```graphql
mutation {
    addNumbers(
        # ERR: constraint violation at index 4
        numbers: [1, 2, 3, 4, 452, 6]
    )
}
```