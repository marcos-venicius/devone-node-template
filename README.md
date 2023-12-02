# DevOne's node project

This is a basic node api project template

## Authenticated version

If you want the authenticated project version you just need to do the following steps:

1. checkout to the correct branch: `git checkout base-auth`
2. install the missing dependencies `npm ci`
3. generate the prisma models `npx prisma generate` and update the database `npx prisma db push`
4. configure your environment variables `HASH_SECRET` | `MAIL_USER` | `MAIL_PASS` | `MAIL_FROM` | `MAIL_HOST` | `MAIL_PORT` | `JWT_SECRET`
5. run the application `npm run dev`

The endpoints are:

1. create user account `POST /v1/users`

- email
- name
- password

2. resend confirmation code if needed `POST /v1/users/send-confirmation-code`

- email

3. confirm your account `POST /v1/users/confirm-account`

- email
- code

4. login `POST /v1/users/login`

- email
- password

5. hello world authenticated `GET /v1/hello-world`

- Header: `Authorization: Bearer <token-provided-on-login>`

## Running the tests

Simple tests

```shell
npm run test
```

Watch tests

```shell
npm run test:watch
```

## How to build and start to production

Build the project

```shell
npm run build
```

Run the project

```shell
npm run start
```

that simple
