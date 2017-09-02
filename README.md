# Example React + Ruby App

Using [alanbsmith/react-sinatra-example](http://github.com/alanbsmith/react-sinatra-example) for expediencies sake. 

## UP & RUNNING
* Clone the repo
* Install Ruby dependencies: `$ bundle install`
* Install JS dependencies: `$ npm install` _or_ `$ yarn`
* Fire up a dev server: `$ npm run dev` _or_ `$ yarn dev`
* Visit `http://localhost:8080` in your browser

#### WHATS HAPPENING?
When you run `npm run dev`, webpack is transpiling all your JS and CSS into a ghost file, `lib/app/public/bundle.js`. It then serves up the HTML file, `lib/app/views/index.html` on a ghost Express server on port 8080.

#### BUT WAIT, WE'RE NOT USING A SINATRA SERVER?
That's correct. To use the Puma server for Sinatra with the transpiled assets, take a look at the [Production Build section](#production-build)

## LINTING
To run the linter once:
```
$ npm run lint
// or
$ yarn lint
```

To run the watch task:
```
$ npm run lint:watch
// or
$ yarn lint:watch
```

## TESTING
To run the tests:
```
$ npm test
// or
$ yarn test
```

## PRODUCTION BUILD

- run `$ npm run build` _or_ `$ yarn build`
- run `ruby lib/app.rb` (We're using Puma by default)

- OR run a local production build `yarn prod` to transpile JS and start a Sinatra server

This creates a transpiled asset file (`bundle.js`) of your JS and CSS in the `lib/app/public/` directory. This is great for production, but not so hot for development workflow as you would need to transpile _every time_ you made a change to the JS.

