# Maintainer:

_pkgname="vesktop"
pkgname="$_pkgname-git"
pkgdesc="A standalone Electron app that loads Discord & Vencord"
pkgver=r334.3a82eed
pkgrel=1
url="https://github.com/D3SOX/Vesktop"
license=('GPL-3.0-only')
arch=("any")

depends=(
  'electron34'
)
makedepends=(
  'git'
  'pnpm'
)
optdepends=(
  'libnotify: Notifications'
  'xdg-utils: Open links, files, etc'
)

provides=("$_pkgname=${pkgver%%.r*}")
conflicts=(
  "$_pkgname"
  "vencord"
)

_pkgsrc="$_pkgname"
source=("$_pkgsrc"::"git+$url.git#branch=mybuild")
sha256sums=('SKIP')

pkgver() {
  cd "$_pkgsrc"
  printf "r%s.%s" "$(git rev-list --count HEAD)" "$(git rev-parse --short HEAD)"
}

build() {
  export SYSTEM_ELECTRON_VERSION=$(</usr/lib/electron34/version)
  export ELECTRONVERSION=${SYSTEM_ELECTRON_VERSION%%.*}

  sed -E -e 's&^(\s*)("electron"): "(.*)"(,?)$&\1\2: "'"$SYSTEM_ELECTRON_VERSION"'"\4&' -e '/linux/s&^&"electronDist": "/usr/lib/electron34",\n&' -i "$_pkgsrc/package.json"

  cd "$_pkgsrc"
  pnpm i
  pnpm package:dir
}

package() {
  local _install_path="usr/lib"
  install -d "$pkgdir/$_install_path/$_pkgname"
  cp --reflink=auto -r "$_pkgsrc/dist/linux-unpacked/resources/app.asar" "$pkgdir/$_install_path/$_pkgname/"

  install -Dm644 "$_pkgsrc/static/icon.png" "$pkgdir/usr/share/pixmaps/$_pkgname.png"
  install -Dm644 "$_pkgsrc/LICENSE" -t "$pkgdir/usr/share/licenses/$pkgname/"

  install -Dm755 /dev/stdin "$pkgdir/usr/bin/$_pkgname" <<END
#!/bin/sh
exec electron34 /$_install_path/$_pkgname/app.asar "\$@"
END

  install -Dm755 /dev/stdin "$pkgdir/usr/share/applications/$_pkgname.desktop" <<END
[Desktop Entry]
Name=Vesktop
GenericName=Internet Messenger
Comment=$pkgdesc
Type=Application
Exec=$_pkgname --ozone-platform-hint=x11 %U
Icon=$_pkgname
Categories=Network;InstantMessaging;
StartupWMClass=Vesktop;
Keywords=discord;vencord;vesktop
END

}
