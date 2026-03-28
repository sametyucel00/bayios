# BayiOS

React + Vite + Capacitor tabanli BayiOS uygulamasi.

## Gereksinimler

- Node.js 20+
- npm 10+
- iOS build icin macOS + Xcode 16+
- Android build icin Android Studio

## Gelistirme

```bash
npm install
npm run dev
```

## Web Build

```bash
npm run build
```

## iOS Hazirlama

Capacitor iOS projesi repo icinde hazir bulunur. Web degisikliklerini iOS tarafa aktarmak icin:

```bash
npm run ios:prepare
```

Bu komut su islemleri yapar:

1. Vite production build alir.
2. Guncel web assetlerini `ios/App/App/public` altina kopyalar.
3. Capacitor iOS yapisini senkronize eder.

## Android Hazirlama

```bash
npm run build
npm run android:sync
```

## GitHub Actions iOS Build

Repo icinde `/.github/workflows/ios-build.yml` bulunur.

Bu workflow:

1. `npm ci` ile bagimliliklari kurar.
2. Web uygulamasini build eder.
3. `npm run ios:sync` ile Capacitor iOS projesini gunceller.
4. `xcodebuild` ile imzasiz simulator build alir.
5. Ortaya cikan `.app` dosyasini artifact olarak yukler.

Not:

- Bu workflow varsayilan haliyle imzasiz simulator build alir.
- App Store / TestFlight icin ayrica Apple sertifikasi, provisioning profile ve signing secret'lari gerekir.

## TestFlight Release

Imzali IPA ve TestFlight upload akisi da hazir:

- [ios-build.yml](C:/Users/Samet/.gemini/antigravity/scratch/bayios/.github/workflows/ios-build.yml)
- [ios-release.yml](C:/Users/Samet/.gemini/antigravity/scratch/bayios/.github/workflows/ios-release.yml)
- [IOS_GITHUB_ACTIONS.md](C:/Users/Samet/.gemini/antigravity/scratch/bayios/IOS_GITHUB_ACTIONS.md)
