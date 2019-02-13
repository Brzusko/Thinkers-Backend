const Express = require('express');
const Guild = require('../schemas/server_schema.js');
const router = Express.Router();
const jwt = require('jsonwebtoken');
const Config = require('../config/config.js');

