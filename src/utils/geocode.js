const mapboxAccessToken = 'pk.eyJ1IjoicGltbmF0IiwiYSI6ImNrMHFtNXNsbzBhMXYzYnJwNG9ob3BxOHIifQ.0UbtNbKddpb9cfh1bkWyBw';
const mapboxUrl = "https://api.mapbox.com";
const request = require("request");

const geocode = (address,callback)=>{
    const url = `${mapboxUrl}/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=${mapboxAccessToken}`;
    request({
        url,
        json: true
    },(error,{body})=>{
        if(error){
            callback("Ops! It does not work",undefined);
        } else if (!body.features.length){
            callback("Location does not exist",undefined);
        } else {
           callback(undefined,{
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
           })
        }
    })
}

module.exports = geocode;