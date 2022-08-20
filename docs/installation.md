# Installation

The current Beta release is only supported on macOS and Linux systems and requires manual installation.

## Manual

1. Download the Closed Beta executable targeting your operating system.
2. Move the executable to your bin directory:
```bash
sudo mv ggproxy /usr/bin/
```
3. Create user `ggproxy`.
4. Create the runtime directory:
```bash
sudo mkdir /var/run/ggproxy && sudo chown ggproxy /var/run/ggproxy
```
5. Create the configuration directory:
```bash
sudo mkdir /etc/ggproxy && sudo chown ggproxy /etc/ggproxy
```
6. Setup your configuration in `/etc/ggproxy`.<br>[Read more about how to configure your ggproxy server](/configuration).
