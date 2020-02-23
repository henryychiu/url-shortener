const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const keys = require('../config/keys');

const Url = require('../models/Url');

// @route     POST /api/url/shorten
// @desc      Create short URL
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
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
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + '/' + urlCode;

        url = new Url({
          urlCode,
          longUrl,
          shortUrl,
          date: new Date()
        });

        await url.save();

        res.json(url);
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