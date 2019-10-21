const request = require("request");

const forecast = function(lang,long,callback){
    const url = `https://api.darksky.net/forecast/ba46562cada307c782eaee7cea482258/${lang},${long}?units=si`;
    request({
        url,
        json: true
    },(error,response)=>{
        if(error){
           callback("Ops! It does not work",undefined);
        } else if(response.body.error) {
           callback("Ops! It does not work",undefined);
        } else {
            const {temperature,precipProbability} = response.body.currently;
            callback(undefined,{temperature,precipProbability})
        }
    })
}

module.exports = forecast;