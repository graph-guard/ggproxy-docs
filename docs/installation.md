# Installation

The current Beta release is only supported on macOS and Linux systems and requires manual installation.

## Automatic

```bash
bash -c "curl -sSfL https://raw.githubusercontent.com/graph-guard/ggproxy-releases/main/install.sh | sudo sh -s -- 0.1.0"
```

## Manual

1. Download the [Beta release](https://github.com/graph-guard/ggproxy-releases/releases) archive with executable targeting your operating system.
```bash
cd /tmp && curl -LO https://github.com/graph-guard/ggproxy-releases/releases/download/0.1.0/ggproxy-0.1.0-linux-amd64.tar.gz
```
2. Extract the archive:
```bash
mkdir ggproxy && tar -xvf ggproxy-0.1.0-linux-amd64.tar.gz -C ggproxy && cd ggproxy
```
3. Move the files to executable and config directories:
```bash
sudo mv usr/local/bin/ggproxy /usr/local/bin/
sudo mv etc/ggproxy/ /etc/
```
4. Change permissions:
```bash
sudo chmod +x /usr/local/bin/ggproxy
sudo find /etc/ggproxy/ -type d -exec chmod 775 -- {} +
sudo find /etc/ggproxy/ -type f -exec chmod 664 -- {} +
```
5. Setup your configuration in `/etc/ggproxy`<br>[Read more about how to configure your ggproxy server](/configuration).


# Uninstallation

## Automatic

```bash
bash -c "curl -sSfL https://raw.githubusercontent.com/graph-guard/ggproxy-releases/main/install.sh | sudo sh -s -- -r"
```

## Manual

```bash
sudo rm -rf /usr/local/bin/ggproxy /etc/ggproxy
```


