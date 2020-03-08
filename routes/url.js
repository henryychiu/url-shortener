const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const keys = require('../config/keys');

const Url = require('../models/Url');
const User = require('../models/User');

// @route     POST /api/url/list
// @desc      Return full list of urls from user
router.post('/list', async (req, res) => {
  const { auth } = req.body;
  if (!!auth == true) {
    const user = await User.findOne({ googleId: auth.googleId });
    res.send(user.urls);
  } else {
    res.send([]);
  }
});

// @route     POST /api/url/remove
// @desc      Remove URL from user
router.post('/remove', async (req, res) => {
  const { longUrl, auth } = req.body;
  if (!!auth == true) {
    let user = await User.findOne({ googleId: auth.googleId });
    let newUrls = user.urls.filter((url) => url.longUrl != longUrl);
    await User.findOneAndUpdate({ googleId: auth.googleId }, { urls: newUrls })
    
    await user.save();
    res.send();
  } else {
    res.send();
  }
});

// @route     POST /api/url/shorten
// @desc      Create short URL
router.post('/shorten', async (req, res) => {
  const { longUrl, auth } = req.body;
  const baseUrl = keys.baseUrl;

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base url');
  }

  // Create url code
  const urlCode = shortid.generate();

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      if (auth == false) {
        let url = await Url.findOne({ longUrl });

        if (url) {
          res.json(url);
        } else {
          const shortUrl = baseUrl + '/' + urlCode;

          url = new Url({
            urlCode,
            longUrl,
            shortUrl
          });

          await url.save();
          res.json(url);
        }
      } else {
        let user = await User.findOne({ googleId: auth.googleId });
        let url = user.urls.find((url) => url.longUrl === longUrl);

        if (url) {
          res.json(url);
        } else {
          const shortUrl = baseUrl + '/' + urlCode;

          url = {
            urlCode,
            longUrl,
            shortUrl,
            createdAt: new Date(),
            clicks: '0'
          };

          user.urls.push(url);
          await user.save();
          res.json(url);
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Invalid long url');
  }

});

module.exports = router;