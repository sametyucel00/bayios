# iOS GitHub Actions Kurulumu

Bu proje iOS icin su kimlikle hazirlandi:

- Uygulama adi: `BayiOS`
- Bundle ID: `com.bayios.app`
- Version: `1.3.5`
- Build number: `19`

## Workflow'lar

- `/.github/workflows/ios-build.yml`
  Amac: imzasiz simulator `.app` build

- `/.github/workflows/ios-release.yml`
  Amac: imzali `.ipa` build ve TestFlight upload

## GitHub Secrets

Release workflow'u icin su secret'lari GitHub repo ayarlarina ekle:

- `IOS_BUILD_CERTIFICATE_BASE64`
  App Store distribution `.p12` sertifikasinin base64 hali

- `IOS_P12_PASSWORD`
  `.p12` export sifresi

- `IOS_PROVISIONING_PROFILE_BASE64`
  App Store provisioning profile dosyasinin base64 hali

- `IOS_PROVISIONING_PROFILE_NAME`
  Apple Developer portalinda gorunen provisioning profile adi

- `IOS_KEYCHAIN_PASSWORD`
  CI icin gecici keychain sifresi

- `APPLE_TEAM_ID`
  Apple Developer Team ID

- `APP_STORE_CONNECT_ISSUER_ID`
  App Store Connect API issuer id

- `APP_STORE_CONNECT_KEY_ID`
  App Store Connect API key id

- `APP_STORE_CONNECT_API_KEY_BASE64`
  `AuthKey_XXXXXX.p8` dosyasinin base64 hali

## Base64 Hazirlama

Windows PowerShell:

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("C:\path\certificate.p12")) | Set-Clipboard
[Convert]::ToBase64String([IO.File]::ReadAllBytes("C:\path\profile.mobileprovision")) | Set-Clipboard
[Convert]::ToBase64String([IO.File]::ReadAllBytes("C:\path\AuthKey_ABC123XYZ.p8")) | Set-Clipboard
```

## Repo'ya Push

Bu klasor su an yerel olarak `.git` icermiyor. Yani once bunu bir GitHub repo'ya baglaman gerekiyor.

Ornek akis:

```bash
git init
git branch -M main
git remote add origin https://github.com/KULLANICI_ADI/REPO_ADI.git
git add .
git commit -m "Prepare iOS and GitHub Actions workflows"
git push -u origin main
```

## Sonraki Adim

Push sonrasi:

1. GitHub repo ayarlarinda secret'lari ekle
2. `Actions > iOS Build` ile simulator build test et
3. `Actions > iOS Release` ile imzali IPA ve TestFlight upload calistir
