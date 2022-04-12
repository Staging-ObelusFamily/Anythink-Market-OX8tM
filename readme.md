# Welcome to the Anythink Market repo

## Getting Started

### Pre-requisites

- NodeJS >= 16
- Yarn
- Running instance of MongoDB

### Install

1. In the root folder, run `npm i`
2. Create a .env file `./backend/.env`, and add this

    ```bash
    MONGODB_URI=mongodb://localhost:27017 (URI to local Mongodb)
    PORT=3000
    ```

3. Create a .env file `./frontend/.env`, and add this

    ```bash
    PORT=3001
    ```

To start the app use: `./start.sh`, it'll start both the backend and the frontend.

Please find more info about each part in the relevant Readme file ([frontend](frontend/readme.md) and [backend](backend/README.md)).

## Development

When implementing a new feature or fixing a bug, please create a new pull request against `main` from a feature/bug branch and add `@vanessa-cooper` as reviewer.
