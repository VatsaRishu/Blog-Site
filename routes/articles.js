const express = require('express')
const article = require('./../models/article')
const Article = require('./../models/article')

const router = express.Router()

router.get('/new', (req,res) => {
    //res.send("Hi Nidiiiiiiiiiiii")
    res.render('articles/new', { article: new Article()})
})


router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
  })
  

router.get('/:id', async (req,res) => {
    const article = await Article.findById(req.params.id)
    //res.send(req.params.id)
    if(article == null) res.redirect('/')
    res.render('articles/show', { article: article })
    
})

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
  })

  router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article })
  })

  router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
  }, saveArticleAndRedirect('edit'))

router.post('/', async (req,res) => {
    //res.send("Hi Nidiiiiiiiiiiii")
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })

    try{
       article = await article.save()
       res.redirect(`/articles/${article.id}`)
    }
    catch(e){
        console.log(`node --trace-deprecation ...`)
        console.log('Error' + e.message)
       res.render('articles/new', { article: article})
    }
   
})


function saveArticleAndRedirect(path) {
    return async (req, res) => {
      let article = req.article
      article.title = req.body.title
      article.description = req.body.description
      article.markdown = req.body.markdown
      try {
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
      } catch (e) {
        res.render('articles/${path}', { article: article})
      }
    }
  }


module.exports = router