# Personnelsystem

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Run the proxy server to forward requests to SP2013
Run `npm run sprestproxy` for a proxy server (use second terminal).   Enter credentials for SP2013.  Then start making AJAX requests to `http://localhost/**/_api/` which will forward to `http://someSharePointServer/**/_api/`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

