# express app

## modules

- chalk
  set color in specific log
- debug
  lunch app indebug mode `DEBUG=app node app.js`
  windows `set DEBUG=* & node app.js`
  other os `DEBUG=* node app.js`
- morgan
  give extra info about the page on the log
- ejs
  template engine to load js in html file

## summary

### part 3 : the first page

- config dev environment by installing some package tools
- config code to serving staic file

### part 4: setting up tooling

- npm scripts
  config script in the package.json file to run customise command
- nodemon
  config nodemon to watch every modication on the files system
- env variables
  config env variable for the system

### part 5 : templating engine

- templating engine ==> EJS
  install ejs package
  tools
- passing data to page
- working with template

### part 6 : using routing to build multiple pages

- implementing navigation
- implementing router
- rendering the page
- passing data
- creating a single item route
- rendering a single item
- separate outer files

### part 7 : connecting to a database

- setting up mongo db
- creating admin route
- inserting sessions
- selecting sessions
- selecting one session

### part 8 : securing application

- implementing signup
- creating Auth Routes
- configuring passport
- local strategy
- creating user
- signing in
- authorizing users
- validating users

### part 9: third party APIs

- starting the API
- creating service
- calling service
