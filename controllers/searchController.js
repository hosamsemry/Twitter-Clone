const User = require('../models/User');
const Tweet = require('../models/Tweet');

exports.searchAll = async (req, res)=>{
    const query = req.query.q
    if (!query || query.trim()=== ""){
        return res.status(400).json({msg: "Query is required"})
    }
    try {
    const users = await User.find(
      { $text: { $search: query } },
    )
      .sort({ score: { $meta: "textScore" } })
      .select("username avatar bio");

    const tweets = await Tweet.find(
      { $text: { $search: query }, isDeleted:false },
    )
      .sort({ score: { $meta: "textScore" } })
      .populate("author", "username avatar bio");

    return res.json({ users, tweets });
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
}

