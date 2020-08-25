# Full-stack Javascript Developer - Take Home Exam

[Spoke](https://github.com/politics-rewired/spoke) is an open-source platform for peer-to-peer texting. Politics Rewired maintains our own fork of the codebase and offers hosted Spoke to a variety of campaigns and organizations. The entire Spoke codebase would take much longer than 3-5 hours to familiarize yourself with so this repo is a stripped down application using the same packages and with some of the same quirks as the main Spoke codebase.

Gauging complexity of software tasks is a difficult! We _think_ this should take between 3-5 hours but could be wrong! **You should definitely not spend more time on it than that**! We'll be talking about the final code as well as the process next week so you shouldn't get hung up on finishing everything or polishing it to perfection. You should also feel free email hiring@politicsrewired.com with any questions that come up.

## Getting Started

**Configuration**

Spoke uses [`envalid`](https://www.npmjs.com/package/envalid) to validate environment variables. The required environment variables are defined in `./server/config.js`. You should feel free to add any server-side variables you think make sense:

```sh
cp .env.example .env
# edit envvars in .env
```

**Database**

Spoke uses [`knex`](https://knexjs.org/) to manage database migrations and queries. Spoke runs against a Postgres database in production. For this task it has been configured to use a local SQLite database file instead.

Populate development database:

```sh
yarn knex migrate:latest
yarn knex seed:run
```

You will need to add a new migration:

```sh
yarn knex migrate:make my_migration_name
```

**Running**

Spoke is both an Express back-end application as well as a React front-end application in one slightly convoluted codebase. We have tried to preserve that here but have provided a (hopefully) easy development environment:

```sh
yarn watch
```

## The Task

Spoke has rudimentary password reset functionality but we can do better! We would like you to create a private fork of this repository and open a pull request against your fork for this feature. Your PR description should include a high level justification for your design decisions.

You can create a private fork by cloning this repository, creating a new empty private repository, adding the private repository as an upstream to your clone of this repository, and pushing to the new private remote. You should add @bchrobot and @ben-pr-p to your private fork.

The `users` table has an `auth0_id` field that has been overloaded to support a few different login strategies. The relevant details for you are that it currently stores either:

- `local|BCRYPT_PASSWORD_HASH`
- `reset|RESET_TOKEN|TOKEN_EXPIRATION`

The current password reset flow is:

1. An administrator creates a reset token for a user from the Spoke admin backend
1. The user visits a password reset link that includes the token
1. If the token is valid the user is able to reset the password

There are a few downsides to this:

- A user must be part of a Spoke organization in order for an organization admin to reset their password; password reset is not possible at all for users that are not part of an organization
- Reseting the password overwrites the stored password
- A user cannot reset their password on their own

What we would like:

- [ ] Login form should have a link to request password reset email
- [ ] Password reset tokens should be stored in a separate table other than `users`
- [ ] The password reset process should be secure
- [ ] The password reset process should use async requests, not the form submission that `/login` currently uses
- [ ] In a perfect world there would be tests. We will not require test-driven developemnt for this task but if time permits you could add unit tests with the Jest framework

### Questions to Think About

Time permitting:

- What is the downside(s) of the current way of storing password reset tokens? Are there any security concerns?
- What columns should the password reset token table have?
- What makes a good user experience?
- What setup is required for sending an email? How might you mock a `sendEmail()` function so that it sends an email in `production` but just logs the email contents in `development`?
