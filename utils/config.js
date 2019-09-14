require('dotenv').config()

let port = 3003
let mongoURI = 'mongodb+srv://qureeb:qureebPassword@cluster0-bmqmg.mongodb.net/blogs?retryWrites=true&w=majority'

module.exports = {
  mongoURI,
  port
}