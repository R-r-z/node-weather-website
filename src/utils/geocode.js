const request = require('postman-request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoici1yLXoiLCJhIjoiY2tvMGQ3YnhjMDdoYTJ2bXlkdTdrYnhnayJ9.kH894yjDtMT3ReSNCep5wg&limit=1'

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to Geocode service!', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined)

    } else {
      const {center:[longitude,latitude],place_name:placeName } = body.features[0]
      callback(undefined, {
        latitude: latitude,
        longitude: longitude,
        location: placeName

      })
    }
  })

}

module.exports = geocode