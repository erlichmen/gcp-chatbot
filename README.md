# gcp-chatbot Instructions

# Dependencies
 - [Node.js](https://nodejs.org/)
 - [npm package manager](https://www.npmjs.com/)
 - [CoffeeScript](http://coffeescript.org/)
# To install npm packages 
```
$ cd functions/
$ npm install 
$ npm -g install firebase-tools
```
# Compile coffee script files
```
$ cd functions/
$ coffee --compile pokemon-battle/
```

# Run in Google Cloud Functions
```
$ firebase deploy --only functions --project <your project name>
```
