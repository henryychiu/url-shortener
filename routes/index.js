const express = require('express');
const router = express.Router();

const Url = require('../models/Url');
const User = require('../models/User');

// @route     GET /:code
// @desc      Redirect to long/original URL
router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      const user = await User.findOne({ 'urls.urlCode': req.params.code }, { 'urls.$': 1 });
      const url = user.urls[0];
      if (url) {
        const newClicks = (parseInt(url.clicks) + 1).toString();        
        await User.findOneAndUpdate({ 'urls.urlCode': req.params.code }, { $set: {'urls.$.clicks': newClicks} });
        return res.redirect(url.longUrl); 
      } else {
        return res.status(404).json('No url found');        
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Server error');
  }
});

module.exports = router;