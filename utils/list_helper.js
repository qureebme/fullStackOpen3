const totalLikes = (blogs) => {
    return blogs.reduce((acc, val) => acc + val.likes, 0)
  }
  
const favoriteBlog = (blogs) => {
    let likes = blogs.map((blog) => blog.likes),
        maxVal = Math.max(...likes),
        index = likes.indexOf(maxVal)

        return blogs[index]
}

const mostBlogs = (blogs) => {
    let authors = blogs.map((blog) => blog.author),
        uniqAuthors = [...new Set(authors)],
        authorCount = new Array(uniqAuthors.length).fill(0);

        for (let i=0; i < uniqAuthors.length; i++){
            for (let j=0; j < authors.length; j++){
                if (uniqAuthors[i] == authors[j]) authorCount[i]++
            }
        }

        let maxIndex = authorCount.indexOf(Math.max(...authorCount))
        let author = uniqAuthors[maxIndex];

        return {
            author: author,
            blogs: authorCount[maxIndex]
        }
}

const mostLikes = (blogs) => {
    let authors = blogs.map((blog) => blog.author),
        uniqAuthors = [...new Set(authors)],
        authorLikes = new Array(uniqAuthors.length).fill(0);

        for (let i=0; i < uniqAuthors.length; i++){
            for (let j=0; j < authors.length; j++){
                if (uniqAuthors[i] == authors[j]) authorLikes[i] += blogs[j].likes
            }
        }

        let maxIndex = authorLikes.indexOf(Math.max(...authorLikes))
        let author = uniqAuthors[maxIndex];

        return {
            author: author,
            likes: authorLikes[maxIndex]
        }
}

  module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }
