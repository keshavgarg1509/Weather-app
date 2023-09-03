const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();


//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views'); 
const partialspath = path.join(__dirname,'../templates/partials');

// Setup handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialspath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req,res)=> {
	res.render('index', {
		title: 'Weather App',
		name: 'Keshav Garg',
	})
})

app.get('/about', (req,res)=> {
	res.render('about', {
		title: 'About Me',
		name: 'Keshav Garg'
	});
})

app.get('/help', (req,res)=>{
	res.render('help',{
		title:'This is help page',
		name: 'Keshav',
		age:24
	});
})

app.get('/weather', (req,res)=>{
	if(!req.query.address){
		return res.send({
			error: 'You must provide an address'
		})
	}

	geocode(req.query.address, (error, data)=> {
		if(error){
			return res.send({error});
		}
		forecast(req.query.address, (error,forecastData)=>{
			if(error){
				return res.send({error});
			}

			res.send({
				forecast: forecastData,
				address: req.query.address,
			})
		})
	})

})


app.get('/products',(req,res)=>{
	if(!req.query.search){
		return res.send({
			error: 'You must provide a search term'
		})
	}

	console.log(req.query.search);
	res.send({
		products: []
	})
})

app.get('/help/*', (req,res)=> {
	res.render('404', {
		title: '404',
		name: 'Keshav',
		errorMessage: 'Help article not found'
	})
})

app.get('*', (req,res)=> {
	res.render('404', {
		title: '404',
		name: 'Keshav',
		errorMessage: 'Page not found'
	})
})

// app.get('/about', (req, res)=> {
// 	res.send('About Page !');
// })

// app.get('/weather', (req,res)=>{
// 	res.send('Weather Page');
// })


app.listen(3000, ()=>{
	console.log('Server is up on port 3000.');
});

