const totalLikes = (blogs) => {
    return blogs.reduce((acc, val) => acc + val.likes, 0)
  }
  
const favoriteBlog = (blogs) => {
    let likes = blogs.map((blog) => blog.likes),
        maxVal = Math.max(...likes),
        index = likes.indexOf(maxVal)

        return blogs[index]
}


  module.exports = {
    totalLikes,
    favoriteBlog
  }


  favoriteBlog([
      {
        me:'you',
        likes: 5
    },
    {
        you:'me',
        likes: 11
    }
])