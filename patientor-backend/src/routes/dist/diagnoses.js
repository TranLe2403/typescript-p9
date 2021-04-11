"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
router.get('/', function (_req, res) {
    res.send('Fetching all diaries!');
});
exports["default"] = router;
