# Configuration

GraphGuard Proxy expects a specific configuration file structure. By default, the configuration directory is located under `/etc/ggproxy` but you can manually change it using `ggproxy serve -config <path>`.

## Ingress & API

The configuration directory must contain the main configuration file `config.yaml` defining ingress and API server configurations:

```yaml
# /etc/ggproxy/config.yaml

ingress:
  # Address and port of the ingress server.
  host: localhost:443
  # Optional, enables HTTPS.
  tls:
    # Certificate file path.
    cert-file: ingress.cert
    # Private key file path.
    key-file: ingress.key
  # Optional, in bytes, default: 4MiB.
  max-request-body-size: 1024

# Optional, enables API server.
api:
  # Address and port of the API server.
  host: localhost:3000
  # Optional, enables HTTPS.
  tls:
    # Certificate file path.
    cert-file: api.cert
    # Private key file path.
    key-file: api.key
```

The ingress server is where all incoming traffic will be received and processed.
The API server serves a GraphQL API providing debugging functionality and information about ggproxy's configuration and statistics.

## Services

A service defines where to forward requests to and what whitelist to apply to incomming traffic.

The configuration directory can contain both `services_enabled` and `services_disabled` subdirectories hosting enabled and disabled service definitions respectively. Disabled service definitions will not accept incoming traffic. A service is uniquely identified by the name of its directory for example: `/etc/ggproxy/services_enabled/my_service` where the unique identifier is `my_service`.

Each service definition must contain its main configuration file `config.yaml`:

```yaml
# /etc/ggproxy/services_enabled/my_service/config.yaml

# The service's display name
name: "Service A"

# Destination URL (where to proxy requests to)
forward_url: "http://localhost:8080/path"

# false for forwarding the original request,
# true for the reduced version.
forward_reduced: true
```

## Whitelist

Each service has its own set of templates forming the query whitelist. The service directory can contain both `templates_enabled` and `templates_disabled` subdirectories hosting enabled and disabled template definitions respectively.
Disabled template definitions will not be considered while matching.

A template is uniquely identified by the name of its file for example: `/etc/ggproxy/services_enabled/my_service/templates_enabled/a.gqt` where the unique identifier is `a`.
Templates are defined using the [GraphQL Template Language](gqt) and can be annotated using frontmatter metadata:

```
---
# /etc/ggproxy/services_enabled/my_service/templates_enabled/a.gqt

# The template's display name
name: "A"

# Arbitrary tags
tags:
    - query
    - products
    - related_products
---
query {
    products(limit: val <= 10, after: any) {
        id
        name
        relatedProducts(type: val = "tea" || val = "juice") {
            id
            name
        }
    }
}
```
