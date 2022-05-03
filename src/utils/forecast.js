const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url =  'http://api.weatherstack.com/current?access_key=d3c26434fde386c78a32e6d49e620d21&query='+ latitude + ',' + longitude + '&units=f'
    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            
            const {body:{current: {feelslike, humidity,uv_index,temperature, weather_descriptions}}} = response
            callback(undefined, weather_descriptions[0]+ ". It's currently " + temperature +" degrees out."
          + " It feels like "+ feelslike + " degrees." + "\n" +"The humidity is " + humidity + " percent "+ "the uv_index is " + uv_index)
        } 
    })

} 

module.exports = forecast