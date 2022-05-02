const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { application } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ray Hines'   
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Ray Hines'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title: 'Help page',
        message: "This is some helpful text.",
        name: 'Ray HInes'
    })
})

app.get('/weather',(req, res) => {

    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    geocode(req.query.search, (error, {latitude, longitude, location} ={}) => {

        if (error) {
            return res.send(error)
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send(error)
            } else {
                res.send({
                    location: location,
                    theForecast: forecastData,
                    address: req.query.search
                })
            }

        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('404-errors',{
        title: '404 Help Error',
        name: 'Ray Hines',
        message: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404-errors', {
        title: '404 Error',
        name: 'Ray Hines',
        message: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})



