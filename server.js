const express = require("express")
const helmet = require('helmet')

const projectRouter = require("./data/helpers/projectModelRouter.js")
const actionRouter = require("./data/helpers/actionModelRouter.js")

const server = express();

server.use(logger)
server.use(helmet());

server.use(express.json());

server.use("/api/projects", projectRouter)
server.use("/api/actions", actionRouter)

server.get('/', (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
  });

  function logger(req, res, next) {
    console.log(`${req.method} Request to ${req.originalUrl} ${Date.now()}`);
  
    next();
  }

  module.exports = server