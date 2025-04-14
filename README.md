# Vesktop (D3SOX)

Vesktop is a custom Discord desktop app. This is my personal branch with some extra features and tweaks.

**Extra features compared to [Vencord/Vesktop](https://github.com/Vencord/Vesktop) main**:
- Global Keybinds (X11, KDE Wayland works too if enabled in System Settings) ([#326](https://github.com/Vencord/Vesktop/pull/326))
- Tray icon voice detection ([#517](https://github.com/Vencord/Vesktop/pull/517))
- [My Vencord branch](https://github.com/D3SOX/Vencord) preinstalled (see its README for the extra features)

**Main features**:
- Vencord preinstalled
- Much more lightweight and faster than the official Discord app
- Linux Screenshare with sound & wayland
- Much better privacy, since Discord has no access to your system

**Not yet supported**:
- see the [Roadmap](https://github.com/Vencord/Vesktop/issues/324)

## Installing

### Arch Linux

```sh
git clone https://github.com/D3SOX/Vesktop
cd Vesktop/arch
makepkg -rsifc
```

### Others

Download the binaries for your platform from [releases](https://github.com/D3SOX/Vesktop/releases)

## Building from Source

You need to have the following dependencies installed:
- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download)
- pnpm: `npm install --global pnpm`

Packaging will create builds in the dist/ folder

```sh
git clone https://github.com/D3SOX/Vesktop
cd Vesktop

# Install Dependencies
pnpm i

# Either run it without packaging
pnpm start

# Or package (will build packages for your OS)
pnpm package

# Or only build the Linux Pacman package
pnpm package --linux pacman

# Or package to a directory only
pnpm package:dir
```
