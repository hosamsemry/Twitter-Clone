const User = require('../models/User');
const Tweet = require('../models/Tweet');

exports.searchAll = async (req, res)=>{
    const query = req.query.q
    if (!query || query.trim()=== ""){
        return res.status(400).json({msg: "Query is required"})
    }
    try {
        const regex = new RegExp(query, 'i');
        const users = await User.find({ username: regex }).select('username avatar bio');
        const tweets = await Tweet.find({ content: regex })
        .populate('author', 'username avatar bio')
        .sort({ createdAt: -1 });
        res.json({users, tweets})
    } catch (err) {
        res.status(500).json({msg:err.msg})
    }
}

