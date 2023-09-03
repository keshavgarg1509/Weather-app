const request = require('request');

const forecast = (address, callback)=>{
	const url = 'http://api.weatherapi.com/v1/current.json?key=b6e468622f4246768fe122959232808&q=' + address + '&aqi=no';

	request({url, json:true}, (error, { body })=>{
		if(error){
			callback('Unable to connect location services !', undefined);
		}
		else if(body.error){
			callback('Unable to find location try another search !', undefined);
		}
		else{
			callback(undefined, 'It is currently ' + body.current.temp_c + ' degree out. ' + 'Its feels like ' + body.current.feelslike_f + ' degree farenhite out.');
		}
	})
}

module.exports = forecast;
