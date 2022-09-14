# GQT Map Operator

The map operator `[... <constraint>]` applies a constraint to all items of an array.

## Example

```
mutation {
    addNumbers(
        # Accept a maximum of 10 numbers and
        # require every number to be less than 100.
        numbers: len < 10 && [... < 100]
    )
}
```

The template above will allow any of the following operations to **pass**:

```graphql
mutation {
    # OK: 6 numbers, all numbers are less than 100
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
