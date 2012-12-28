2012 Box Office Cinema
======================

This app was made for SCVSoft's 2012 Code Happening.

## Installation Instructions

You need to have nodejs installed on your server. Instructions to install can be found [here](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager) or [here](http://nodejs.org/).

Once you have node, upload a zip with the source code. Unzip it on a place you like.

Then, located on the root of the source code, you need to run *npm install*

Finally, run the app by issuing *node app*

The app usually listens on port 3000, but you can change that behavior by setting a PORT variable on your environment

## Acknoledgments

The app uses the following 3rd party libraries:

- [JQuery](http://jquery.com/) for general purpose javascript
- [Underscore](http://underscorejs.org/) as a javascript utility belt
- [Nodejs](http://nodejs.org/) as server side platform
- [Expressjs](http://expressjs.com/) as web framework on top of node
- [Datejs](http://www.datejs.com/) for date manipulation
- [Jade](https://github.com/visionmedia/jade) for templating engine

The app fetches content from 
- [Box office mojo](https://www.nytimes.com/) 
- [The Youtube data API](https://gdata.youtube.com/demo/index.html) to fetch the trailers
