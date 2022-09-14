# GQT Input Constraints

Input constraints restrict input values. If no constraint operator is used then GQT
assumed the equality constraint by default, for example: `argument: 10` requires `argument` to be equal `10`, while `argument: != 10` requires `argument` to **not** be equal `10`.
Constraint may be applied to input parameters as well as input object fields.
The following constraints are supported:

| Constr. | Description | Types |
|-|-|-|
| `*` | Matches all values of all types. | All types. |
| `α` | Requires value to be exactly equal `α`. | All types. |
| `!= α` | Requires value to be not equal `α`. | All types. |
| `> α` | Requires value to be greater `α`. | All numeric types. |
| `>= α` | Requires value to be greater or equal `α`. | All numeric types. |
| `< α` | Requires value to be less than `α`. | All numeric types. |
| `<= α` | Requires value to be less than or equal `α`. | All numeric types. |
| `len > α` | Requires the input array length or string byte length to be greater `α`. | array, `String` |
| `len >= α` | Requires the input array length or string byte length to be greater or equal `α`. | array, `String` |
| `len < α` | Requires the input array length or string byte length to be less than `α`. | array, `String` |
| `len <= α` | Requires the input array length or string byte length to be less than or equal `α`. | array, `String` |
| `[...β]` | Requires the input array to match constraint `β` at every index. | array, `String` |

## Example 1

The following template requires:
- `query.products.limit` to be less than or equal `10`.
- `query.products.relatedProducts.type` to be equal `"chocolate"`.
- `query.products.relatedProducts.tags` to be an array of length less than 4.
- `query.products.relatedProducts.like` to be a string with a maximum length of 128 bytes.

`query.products.after` remains unrestricted accepting any incoming value.

```
query {
    products(limit: <= 10, after: *) {
        id
        name
        relatedProducts(
            input: {
                type: "chocolate",
                tags: len < 4,
                like: len <= 128,
            } 
        ) {
            id
            name
        }
    }
}
```

The template above will allow any of the following operations to **pass**:

```graphql
{
    # OK: limit is equal 10 and after is unrestricted
    products(limit: 10, after: "something") {
        # OK: subquery
        id
    }
}
```

```graphql
{
    # OK: limit is less than 10 and after is unrestricted
    products(limit: 1, after: null) {
        id name
        relatedProducts(input: {
            # OK: type is equal "chocolate"
            type: "chocolate",
            # OK: tags length is less than 4
            tags: [ "foo", "bar", "baz" ],
            # OK: like is 12 bytes long, it's less than 128
            like: "Ελλάδα"
        }) {
            id
            name
        }
    }
}
```

```graphql
query(
    $limit: Int! = 1,
    $after: String = null,
    $relProdType: String! = "chocolate",
    $relProdTags: [String!]! = [ "foo", "bar", "baz" ],
    $relProdLike: String! = "Ελλάδα"
) {
    # OK: limit is less than 10 and after is unrestricted
    products(limit: $limit, after: $after) {
        id name
        relatedProducts(input: {
            # OK: like is 12 bytes long, it's less than 128
            like: $relProdLike
            # OK: tags length is less than 4
            tags: $relProdTags,
            # OK: type is equal "chocolate"
            type: $relProdType,
        }) { id name }
    }
}
```

The following operations will be **rejected**:

```graphql
{
    # ERR: constraint violation, limit is greater 10
    products(limit: 11, after: null) {
        id name
        relatedProducts(input: {
            type: "chocolate",
            tags: [ "foo", "bar", "baz" ],
            like: "Ελλάδα"
        }) { id name }
    }
}
```

```graphql
{
    products(limit: 1, after: null) {
        relatedProducts(input: {
            # ERR: type is not equal "chocolate"
            type: "not chocolate",
            tags: [ "foo", "bar", "baz" ],
            like: "Ελλάδα"
        }) { id name }
    }
}
```

```graphql
{
    products(limit: 1, after: null) {
        relatedProducts(input: {
            type: "chocolate",
            # ERR: array length exceeds limit
            tags: [ "foo", "bar", "baz" ],
            like: "Ελλάδα"
        }) { id name }
    }
}
```

```graphql
{
    products(limit: 1, after: null) {
        relatedProducts(input: {
            type: "chocolate",
            tags: [ "foo", "bar", "baz" ],
            # ERR: string byte-length exceeds limit
            like: """
                }αυτή η εξαιρετικά μεγάλη τιμή κειμένου
                που υπερβαίνει το όριο των 128 byte
            """
        ) { id name }
    }
}
```

```graphql
{
    # ERR: missing argument "after"
    # arguments required by the template must be present
    products(limit: 1) { id }
}
```

## Example 2

Value constraints can also be nested and applied to objects and arrays.

```
mutation {
    postCoordinates(
        data: [
            {x: != null, y: != null}
            {x: != null, y: != null}
            {x: != null, y: != null}
        ]
        factors: [
            [!= 10, != 14]
        ]
    )
}
```

The template above will allow any of the following operations to **pass**:

```graphql
mutation {
    postCoordinates(
        data: [
            { x: 1.23 y: 2.34 }
            { x: 3.45 y: 4.56 }
            { x: 5.67 y: 6.78 }
        ],
        factors: [ [ 20, 30 ] ]
    )
}
```

The following operations will be **rejected**:

```graphql
mutation {
    postCoordinates(
        data: [
            { x: 1.23 y: 2.34 }
            { x: 3.45 y: 4.56 }
            # ERR: missing third array item
        ],
        factors: [ [ 20, 30 ] ]
    )
}
```

```graphql
mutation {
    postCoordinates(
        data: [
            { x: 1.23 y: 2.34 }
            { x: 3.45 y: 4.56 }
            { x: 5.67 y: 6.78 }
        ],
        # ERR: number must not be equal 10 at indexes [0][1]
        factors: [ [ 20, 14 ] ]
    )
}
```
