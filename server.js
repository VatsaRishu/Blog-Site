const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const createDomPurifier = require('dompurify')
const app = express()

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useCreateIndex', true);

app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))

app.set('view engine', 'ejs')
app.get('/', async(req,res) => {
   const articles = await Article.find()
    //res.send("Hi Nidiiiiiiiiiiii")
   // res.render('index')
   /*const articles = [{
       title: 'First Article',
       createdAt: new Date(),
       description: 'This is my first post'
   },
   {
    title: 'Second Article',
    createdAt: new Date(),
    description: 'This is my Second post'
  }]*/
   res.render('articles/index', { articles: articles })
})


app.use('/articles', articleRouter)

app.listen(5000)