const request = require('postman-request')

const forecast = (latitude,longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=82528bbaf1a98ccab5d947128a4a26de&query=' + latitude + ',' + longitude

  request({ url, json: true }, (error, { body } = {}) => {

    if (error) {
      callback('Unable to connect to weather service', undefined)
    } else if (body.error) {
      const { code:errorCode, type:errorType, info:errorInfo} = body.error
      callback('error: '+errorCode+' type: '+errorType+' information: '+errorInfo, undefined)
    } else {
      const { location: { country: location, timezone_id: timeZone, localtime: time }, current: { weather_descriptions:weatherDescription,temperature:temp,precip} }= body
      callback(undefined, weatherDescription +', It is currently '+temp+ ' celcius degrees out.'+'There is a '+precip+ '% chance of rain.')
    }

  })
}

module.exports = forecast