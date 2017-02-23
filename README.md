# BasicBoilerplate

A trivial starting point for front end stuff.

## Requirements

The repo assumes the use of Yarn (https://yarnpkg.com), and requires the installation of gulp-cli.

`npm install yarn gulp-cli -g`

## Get Started

`yarn`

## What's currently supported

* SCSS - Transpiling piped through PostCSS for autoprefixing.
* JS - Transpiling with support for es2015, es2016 and es2017. JSX can be added. Output is piped through uglify, resulting in very small files.

## TODO

* Add testing support. I've used [Cypress.io] before, and was rather pleased: natural sugar around karma/mocha/chai. While I'm decided, I'd like to support it out of the box.

[Cypress.io](https://www.cypress.io/)
