const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000; 

//Define path for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');


//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirPath));


app.get('',(req,res)=>{
    res.render('index',{
        title: "hello",
    });
});

app.get('/weather',(req,res)=>{
    if(!req.query.address) {
        return res.send("you need to provide address")
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,{temperature,precipProbability,summary,temperatureHigh,temperatureLow} = {})=>{
            if(error){
                return res.send({"error": "ops forecast"})
            }

            res.send({
                currentForecast: `In ${location} it is currently ${temperature} degrees out and the chance of precipitation is ${precipProbability}%.`,
                dailySummary: summary,
                address: req.query.address,
                location
            });
        })
    })
}); 

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "elo weather",
        location: "Oslo",
        forecast: "There is no bad weather"
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title: "elp",
        location: "Oslo",
        forecast: "There is no bad weather"
    });
});

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: "404",
        msg: "ups help"
    });
});

app.get('/*',(req,res)=>{
    res.render('404',{
        title: "404",
        msg: "ups"
    });
});

app.listen(port,()=>{
    console.log("server is up");
});