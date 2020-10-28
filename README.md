# Introduction to Authentication

Guided project for **Node Auth 1** Module.

## Prerequisites

- [TablePlus](https://tableplus.com) installed.
- A rest client like [Insomnia](https://insomnia.rest/download/) or [Postman](https://www.getpostman.com/downloads/) installed.

## Project Setup

- [ ] fork and clone this repository.
- [ ] **CD into the folder** where you cloned **your fork**.
- [ ] type `npm install` to download dependencies.
- [ ] type `npm run server` to start the API.

Please follow along as the instructor adds authentication to the API.


I added two additional things to take note of. In index.js I installed the connect-session-knex library, which helps us save the sessions to the database rather than memory. This prevents everyone from getting logged out when the server restarts.
I also added a GET /logout endpoint, which just calls req.session.destroy(). This deletes the session server-side and logs the current user out.