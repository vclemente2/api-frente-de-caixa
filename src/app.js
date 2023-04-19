const app = require('./server')

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
