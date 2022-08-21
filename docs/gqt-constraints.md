# GQT Input Constraints

Input constraints restrict input values.
The following constraints are supported:

| Constr. | Description | Types |
|-|-|-|
| `any` | Matches all values of all types. | All types. |
| `val = α` | Requires value to be exactly equal `α`. | All types. |
| `val != α` | Requires value to be not equal `α`. | All types. |
| `val > α` | Requires value to be greater `α`. | All numeric types. |
| `val >= α` | Requires value to be greater or equal `α`. | All numeric types. |
| `val < α` | Requires value to be smaller `α`. | All numeric types. |
| `val <= α` | Requires value to be smaller or equal `α`. | All numeric types. |
| `bytelen > α` | Requires the input string value byte-length to be greater `α`. | `String` |
| `bytelen >= α` | Requires the input string value byte-length to be greater or equal `α`. | `String` |
| `bytelen < α` | Requires the input string value byte-length to be smaller `α`. | `String` |
| `bytelen <= α` | Requires the input string value byte-length to be smaller or equal `α`. | `String` |
| `len > α` | Requires the input array length to be greater `α`. | `Array` |
| `len >= α` | Requires the input array length to be greater or equal `α`. | `Array` |
| `len < α` | Requires the input array length to be smaller `α`. | `Array` |
| `len <= α` | Requires the input array length to be smaller or equal `α`. | `Array` |

The following template requires:
- `query.products.limit` to be smaller or equal `10`.
- `query.products.relatedProducts.type` to be equal `"chocolate"`.
- `query.products.relatedProducts.tags` to be an array of length smaller 4.
- `query.products.relatedProducts.like` to be a string with a maximum length of 128 bytes.

`query.products.after` remains unrestricted accepting any incoming value.

## Example 1

```
query {
    products(limit: val <= 10, after: any) {
        id
        name
        relatedProducts(
            type: val = "chocolate",
            tags: len < 4
            like: bytelen <= 128
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
    # OK: limit is smaller 10 and after is unrestricted
    products(limit: 1, after: null) {
        id name
        relatedProducts(
            # OK: type is equal "chocolate"
            type: "chocolate",
            # OK: tags length is smaller 4
            tags: [ "foo", "bar", "baz" ],
            # OK: like is 12 bytes long, it's smaller 128
            like: "Ελλάδα"
        ) {
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
    # OK: limit is smaller 10 and after is unrestricted
    products(limit: $limit, after: $after) {
        id name
        relatedProducts(
            # OK: like is 12 bytes long, it's smaller 128
            like: $relProdLike
            # OK: tags length is smaller 4
            tags: $relProdTags,
            # OK: type is equal "chocolate"
            type: $relProdType,
        ) { id name }
    }
}
```

The following operations will be **rejected**:

```graphql
{
    # ERR: constraint violation, limit is greater 10
    products(limit: 11, after: null) {
        id name
        relatedProducts(
            type: "chocolate",
            tags: [ "foo", "bar", "baz" ],
            like: "Ελλάδα"
        ) { id name }
    }
}
```

```graphql
{
    products(limit: 1, after: null) {
        relatedProducts(
            # ERR: type is not equal "chocolate"
            type: "not chocolate",
            tags: [ "foo", "bar", "baz" ],
            like: "Ελλάδα"
        ) { id name }
    }
}
```

```graphql
{
    products(limit: 1, after: null) {
        relatedProducts(
            type: "chocolate",
            # ERR: array length exceeds limit
            tags: [ "foo", "bar", "baz" ],
            like: "Ελλάδα"
        ) { id name }
    }
}
```

```graphql
{
    products(limit: 1, after: null) {
        relatedProducts(
            type: "chocolate",
            tags: [ "foo", "bar", "baz" ],
            # ERR: string byte-length exceeds limit
            like: """
                αυτή η εξαιρετικά μεγάλη τιμή κειμένου
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
        data: val = [
            val = {
                x: val != null
                y: val != null
            }
            val = {
                x: val != null
                y: val != null
            }
            val = {
                x: val != null
                y: val != null
            }
        ]
        factors: val = [
            val = [
                val != 10
                val != 14
            ]
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