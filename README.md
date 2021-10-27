# Ionic 5/Capacitor 3 + Tailwind CSS + Auth0 + GraphQL + React + Typescript Real-World Mobile App Demo

A demo app for [Ionic 5](https://ionicframework.com) and [Capacitor 3](https://capacitorjs.com) that shows how to build a real-world cross-platform app with authentication, graphql, and react. All make possible with only free community plugins.

Probably you are here because you cannot find an ionic/capacitor example that uses Tailwind CSS or anything with authentication. And yes, it's the same reason I build this demo app here. So, have fun!

## Features

- ⚡ Latest Ionic 5 + Capacitor 3
- 📰 Real-time data feed (dev.to) via GraphQL
- 🔑 Secure SSO/password authentication via Auth0
- 🎨 Styling with TailwindCSS
- 🔃 Live reload! Code changes are automatically reflected in the app!
- ⚛️ ~Not angular~, it's React!
- 🧞 Everything in TypeScript!
- 🥇 Single app for both iOS and Android

## Quick Start

1. Simply clone the repo and bootstrap the repository via `npm install`!

```shell
npm install
```

2. Run the app on a simulator or real device

```shell
npm run ios
```

or

```shell
npm run android
```

3. Open your code editor and start coding! All source files are in the `src` directory.

## Configuring your app

There are a few things you may want to change to customise your app.
First, you'll want to change the `APP_ID` and `AUTH0_CLIENT_ID` values in the `src/environments/environment.ts` file.

Also, checkout `capacitor.config.ts` and customise it to suit your needs.
For detail see https://capacitorjs.com/docs/config

## Test your app like a PRO! ⚡⚡⚡

Running a mobile emulator on your local machine can be painfully slow Orz... 😪
Well. There's a way to speed it up: Run it on the cloud, and even better, on a **real device**!!!

There are a couple of cloud emulators available.
In my case, I use [browserstack](https://www.browserstack.com) because it offers real-time testing on a real device.
Alternatively, [LambdaTest](https://www.lambdatest.com) is also a good option with a cheaper price, though they only provide emulators, not real devices.
But Google will help you find the best one for you.

I am sharing my setup here, so you can replicate the experience on your provider.

1. Setup a local tunnel to the provider.
   For example, using [Browserstack Local](https://www.browserstack.com/local-testing) or [LambdaTest Tunnel](https://www.lambdatest.com/support/docs/testing-locally-hosted-pages).

2. Serve the web app from your local machine or even on the cloud.

   For example, run `npm run start:web` for serving the app from your local machine. (Note: `HOST` and `PORT` are configurable in `ionic:serve` life cycle script).

3. Set the serving URL that the app can reach via the tunnel in environment variable `LIVE_RELOAD_URL` and open the project to compile the app package: e.g. `LIVE_RELOAD_URL=http://localhost.lambdatest.com:8100 npm run open:ios` if you follow the default setting for lambda test.

   Under the hood, `LIVE_RELOAD_URL` loaded in `capacitor.config.ts` to generate the relevant **live reload** setting below:

```json
{
  "server": {
    "url": "<LIVE_RELOAD_URL>",
    "cleartext": true
  }
}
```

4. Upload the build (a `.ipa` for iOS or `apk` for android) to your provider.

5. Run the app on a cloud device and have fun!

**NOTE** Currently, the app is only tested on iOS and Android.

## Development Notes

### Live Reload

There are some tutorials out there suggesting you manually put your external IP address to `capacitor.config.ts` in order to use live reload.

While it's true that a configuration is need in order to connect to an external web server for loading the web app,
if you use my setup, this configuration is automatically loaded when you supply `LIVE_RELOAD_URL`.

You don’t need to manually add it for development or remove it for a production build.

### Authentication

#### Auth0 Configuration

For more detail, [check out the guide](https://auth0.com/docs/quickstart/native/ionic4) at Auth0

1. Configure Callback URLs
   A callback URL is a URL in your application where Auth0 redirects the user after they have authenticated.

The callback URL for your app must be whitelisted in the Allowed Callback URLs field in your Application Settings. If this field is not set, users will be unable to log in to the application and will get an error.
YOUR_PACKAGE_ID://YOUR_DOMAIN/cordova/YOUR_PACKAGE_ID/callback

2. Configure Allowed Origins (CORS)
   Add file as an allowed origin to the Allowed Origins (CORS) box.

`file://*`

If you're testing the app on a browser via `npm run start:web` or the equivalent `ionic serve`,
be aware that the setting for the `Allowed Origins` and `Callback URLs` may be different.
By default, it should be from `http://localhost:8100`.

#### App Configuration

For being able to open the app from a custom scheme you need to register the scheme first.
Assuming your custom scheme is `custom.scheme` so that the app will open any `custom.scheme://<url>` link,
follow the instruction below for the two platforms.

Check out [https://capacitorjs.com/docs/apis/app](https://capacitorjs.com/docs/apis/app) for more detail.

For iOS,

1. In `ios/App/App/Info.plist` add something similar to the following:

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLName</key>
    <string>custom.scheme</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>custom.scheme</string>
    </array>
  </dict>
</array>
```

**IMPORTANT** Change `custom.scheme` to your custom scheme.

For Android,

1. In `android/app/src/main/AndroidManifest.xml`, inside the activity section, add the following:

```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="@string/custom_url_scheme" />
</intent-filter>
```

2. Then in `android/app/src/main/res/values/strings.xml`, change the value of `custom_url_scheme` to your custom scheme.

3. Finally in `android/app/src/main/res/xml/config.xml`, add the following at root so that only one instance of your app will be ever be launched and therefore after authentication the callback will always be delivered to the right app.

```xml
<preference name="AndroidLaunchMode" value="singleTask" />
```

### Deep Links

Deep links allow you to send someone a link that will be opened in the app they have installed on their phone. For setting it up, follow the official guide here https://capacitorjs.com/docs/guides/deep-links

## FAQ

1. How to run the app on a device?

   Open xcode or android studio with the command below and select the device target before start running.

```shell
npm run open ios
```

or

```shell
npm run open android
```

## Credits

1. Special thanks to OneGraph [https://www.onegraph.com](https://www.onegraph.com/) for providing the demo data. They are one service connecting to many others such as stripe, GitHub, Twitter etc. all in one. Check them out.

### Other Cool Demos & Starters

- [nextjs-tailwind-ionic-capacitor-starter](https://github.com/mlynch/nextjs-tailwind-ionic-capacitor-starter): A similar demo with TailwindCSS, but achieved via Next.js and JS only.

### License

Copyright © 2021, [Alvis Tang](https://github.com/alvis). Released under the [MIT License](LICENSE).

[![license](https://img.shields.io/github/license/alvis/bareapp.svg?style=flat-square)](https://github.com/alvis/bareapp/blob/master/LICENSE)
