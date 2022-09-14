# GQT Combination Set

Sometimes it takes a lot of templates to cover all possible mutually exclusive combinations. In this case, the `max <n> { <options> }` syntax can be used to define a maxium number of selection that can be selected from the options.

The maxium number of selectable options must always be greater or equal 1 and less than or equal the number of options minus 1.

`max` statements cannot be nested.
`max` statements also cannot redeclare fields declared in its parent selection set.

## Example

```
query {
    # Allow any combination between 2 fields
    # within the selection set.
    max 2 {
        foo
        bar
        baz
    }
}
```

The template above will allow any of the following operations to **pass**:

```graphql
query { foo }
```

```graphql
query { bar }
```

```graphql
query { baz }
```

```graphql
query { foo bar }
```

```graphql
query { bar baz }
```

```graphql
query { baz foo }
```

The following operations will be **rejected**:

```graphql
query {
    # ERR: Exceeds max combination limit of 2 fields.
    foo bar baz
}
```
