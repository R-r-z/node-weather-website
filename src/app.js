const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Rafael Ramos'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Rafael Ramos'
  })
  
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Get Help',
    message: 'Contact us in case you need any kind of help or support',
    name: 'Rafael Ramos'
  })
})

app.get('/weather', (req, res) => {

  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
    
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    
    if (error) {
      return res.send({
        error: error
      })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      
      if (error) {
        return res.send({
          error:error
        })
      }

      res.send({ location,forecastData })
      
      
    })
    
    console.log(longitude,latitude)
  })
  
  console.log(req.query.address)

})

app.get('/products', (req, res) => {

  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Help article not found',
    errorMessage: 'The help article you are looking for does not exist',
    name: 'Rafael Ramos'
  })
  
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page not found',
    name: 'Rafael Ramos',
    errorMessage: 'The page you are trying to access does not exist'
 })
  
})


app.listen(3000, () => {
  console.log('Server is up on port 3000')
})