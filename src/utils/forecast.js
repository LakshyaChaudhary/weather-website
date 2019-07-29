const request = require('request')

const forecast = (latitude,longitude,callback) => {

    url = 'https://api.darksky.net/forecast/7d713ebd17edba098d9257b6bb9bc5f2/' + latitude + ',' + longitude

    request({url: url , json:true},(error,response) => {

        if(error){
            callback('Unable to connect to weather service',undefined)
        } else if(response.body.error) {
            callback('unable to find location',undefined)
        } else{
            const temp = response.body.currently.temperature
            var temp2 = (temp - 32)*5/9
            temp2 = temp2.toFixed(2)
            callback(undefined, response.body.daily.data[0].summary +'It is currently ' + temp2 + ' degrees celsius out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
        }

    })

}

module.exports = forecast