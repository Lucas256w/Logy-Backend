# Logy-Backend
### Client-Side: [repo](https://github.com/Lucas256w/Logy)
### CMS: [repo](https://github.com/Lucas256w/Logy-CMS)

## Run It Locally

### Prerequisites

- You'll need to install the Client-side repository and CMS repository along with this one to have access to all features

### Cloning the repository

Make a appropriate directory and cd to it using the terminal

```bash
# Clone this repository
$ git clone git@github.com:Lucas256w/Logy-Backend.git

# Go into the repository
$ cd Logy-Backend
```

### Install dependencies

```bash
# Install dependencies
$ npm install
```

### Setting up environment variables

- Make a file at the root directory called `.env`.
- Populate `.env` located in server with the following environment variables:
  - `CONNECTION_STRING`: Connection string to your MongoDB database
  - `SECRET_KEY_PUBLIC`: The secret key that JWT use to sign users (On Logy main site)
  - `SECRET_KEY_AUTHOR`: The secret key that JWT use to sign the author (On Logy CMS site)
  - `CORS_ALLOWED_ORIGIN`: The endpoints that are allowed to access the API


### Starting the application

From root directory run the following commands:

```bash
# Start the server
$ npm run serverstart

```
