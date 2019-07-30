const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// DEFINE PATHS FOR EXPRESS CONFIG
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// SETUP HANDLEBARS ENGINE AND VIEW LOCATION
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)


// SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectoryPath))


app.get('',(req, res) => {

    res.render('index',{
        title: 'Weather App',
        name: 'Lakshya'
    })
})


app.get('/about',(req, res) => {

    res.render('about',{
        title: 'About the App',
        name: 'Lakshya'
    })
})


app.get('/about/*',(req, res) => {

    res.render('404',{
        title: '404',
        name: 'Lakshya',
        errorMessage: 'about article not found'
    })
})




// app.get('',(req, res) => {

//     res.send('hello express')
// })

// app.get('/help',(req,res) => {

//     res.send('help page')
// })

// app.get('/about',(req,res) => {

//     res.send('<h1>About</h1>')
// })

app.get('/weather',(req,res) => {

    if(!req.query.address){

        return res.send({
            error: 'you must provide a address'
        })

    }

    const address = req.query.address

    geocode(address,(error,data) => {

        if(error){
            return res.send({error : error})
        }

        // console.log('Error',error)
        // console.log('Data',data)

        forecast(data.latitude, data.longitude, (error, forecastData) => {
           
           if(error){
               return res.send({error : error})
           }

           res.send({
            location: data.location,
            forecast: forecastData,
            address: req.query.address
            })
           
        })
    })

   
    
})


app.get('/products',(req,res) => {

    if(!req.query.search){

        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query)

    res.send({
        product : []
    })
})



app.get('*',(req, res) => {

    res.render('404',{
        title: '404',
        name: 'lakshya',
        errorMessage: 'page not found'
    })
})


// app.com
// app.com/help
// app.com/about

app.listen(port,() => {
    console.log('server is upto port' + port)
})