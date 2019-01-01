const express = require('express');
const router = express.Router();
const fs = require('fs');
const HTMLParser = require('node-html-parser');
const FILENAME = "comments.txt";

const data = fs.readFileSync(FILENAME, 'utf8');

let users = readComments(data);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { users: users });
});

function readComments(data) {
    let users = [];

    let root = HTMLParser.parse(data);
    root = root.childNodes[0].childNodes;

    for (let comment of root) {
      let user = {};
      comment = comment.childNodes[0].childNodes[0];

      let img = comment.childNodes[0].childNodes[0].childNodes[0];

      if (!img || !img.hasOwnProperty("rawAttrs")) continue;

      img = img.rawAttrs.split('src="')[1].toString().replace(/&amp;/g, '&');
      user.img = img;

      comment = comment.childNodes[1];
      while (!comment.hasOwnProperty("rawText"))  {
        comment = comment.childNodes[0];
      }
      user.name = comment.rawText;

      users.push(user);
    }

    return users;
}

module.exports = router;
