# Bingo Tournament Website

Static version of the website that was used for the 2022 OoT Bingo Tournament. The website is deployed
on https://xwmtp.github.io/bingo2022.

## Install

On [Github.com](https://github.com), go to `Settings` -> `Developer Settings` -> `Personal access tokens`.
Create a new Personal access token with the scopes `repo` and `read:packages`.
Run

```bash
npm login --scope=@xwmtp --registry=https://npm.pkg.github.com
```

to log in. Use the created access token as the password.

Then run

```bash
npm install
```

## Run

```bash
npm start
```

