function extractHashtags(text) {
  const regex = /#\w+/g;
  const matches = text.match(regex) || [];
  return matches.map(tag => tag.slice(1).toLowerCase());
}


module.exports = extractHashtags;