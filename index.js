const config = require('./utils/config')
const http = require('http')
const app = require('./app')



const PORT = config.PORT
http.createServer(app).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})