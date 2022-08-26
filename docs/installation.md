# Installation

Open Beta 0.1.0 is only supported on macOS and Linux systems.<br>
Just copy and run the installation script in your terminal:

```bash
bash -c "curl -sSfL https://raw.githubusercontent.com/graph-guard/ggproxy-releases/main/install.sh | sudo sh -s -- 0.1.0"
```

Once you've installed ggproxy you need to configure your setup under `/etc/ggproxy`.<br>
[Read more about how to configure your ggproxy server](/configuration).

If the installation script fails, please consider the manual installation instructions below.

## Manual

1. Download the [Beta release](https://github.com/graph-guard/ggproxy-releases/releases) archive containing the executable targeting your operating system.
```bash
cd /tmp && curl -LO https://github.com/graph-guard/ggproxy-releases/releases/download/0.1.0/ggproxy-0.1.0-linux-amd64.tar.gz
```
2. Extract the archive:
```bash
mkdir ggproxy && tar -xvf ggproxy-0.1.0-linux-amd64.tar.gz -C ggproxy && cd ggproxy
```
3. Move your executable to `/usr/local/bin/` and the config directories to `/etc/ggproxy/`:
```bash
sudo mv usr/local/bin/ggproxy /usr/local/bin/
sudo mv etc/ggproxy /etc/
```
4. Change permissions:
```bash
sudo chmod +x /usr/local/bin/ggproxy
sudo find /etc/ggproxy/ -type d -exec chmod 775 -- {} +
sudo find /etc/ggproxy/ -type f -exec chmod 664 -- {} +
```
5. Setup your configuration in `/etc/ggproxy`<br>
[Read more about how to configure your ggproxy server](/configuration).


## Uninstallation

To uninstall `ggproxy` just copy and run the installation script in your terminal:

```bash
bash -c "curl -sSfL https://raw.githubusercontent.com/graph-guard/ggproxy-releases/main/install.sh | sudo sh -s -- -r"
```

If the uninstallation script fails, please consider the manual uninstallation instructions below:

```bash
sudo rm -rf /usr/local/bin/ggproxy /etc/ggproxy
```


