# Installation

The current Beta release is only supported on macOS and Linux systems and requires manual installation.

## Automatic

```bash
curl -sSfL https://raw.githubusercontent.com/graph-guard/ggproxy-releases/main/install.sh | sudo sh -s -- 0.1.0
```

## Manual

1. Download the [Beta release](https://github.com/graph-guard/ggproxy-releases/releases) archive with executable targeting your operating system.
```bash
curl -LO https://github.com/graph-guard/ggproxy-releases/releases/download/0.1.0/ggproxy-0.1.0-linux-amd64.tar.gz
```
2. Extract the archive:
```bash
mkdir ggproxy && tar -xvf ggproxy-0.1.0-linux-amd64.tar.gz -C ggproxy && cd ggproxy
```
3. Move the executable to your bin directory:
```bash
sudo mv usr/local/bin/ggproxy /usr/local/bin/
```
4. Move the configuration files into `/etc` directory:
```bash
sudo mv etc/ggproxy/ /etc/
```
5. Change permissions:
```bash
sudo chmod +x /usr/local/bin/ggproxy
sudo find /etc/ggproxy/ -type d -exec chmod 775 -- {} +
sudo find /etc/ggproxy/ -type f -exec chmod 664 -- {} +
```
6. Setup your configuration in `/etc/ggproxy`<br>[Read more about how to configure your ggproxy server](/configuration).
