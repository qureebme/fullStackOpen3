const totalLikes = (blogs) => {
    return blogs.reduce((acc, val) => acc + val.likes, 0)
  }
  


  module.exports = {
    totalLikes
  }