const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
const bodyParse = require('body-parser')
const pessoasRouter = require('./routes/pessoas')

const model = require('./models/index')
app.use(bodyParse.urlencoded({extended:true}))
app.use(express.static('public'))

app.use('/pessoas', pessoasRouter)
app.get('/', (req, res) => res.render('home'))


app.set('views',path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

model.sequelize.sync().then(() => 
    app.listen(port, () => console.log('Crud ORM listening'))
)
