import {useState,useEffect} from 'react';
import {geolocated } from 'react-geolocated';
import NodeGeocoder from 'node-geocoder';

import {FetchWeather, FetchCity} from './api/FetchWeather'
import './App.css';

const App = () =>{
	const [Search, SetGetSearch] = useState('')
	const [weather, setWeather] = useState({})

	useEffect(() =>{
		 if ("geolocation" in navigator) {
			 	  navigator.geolocation.getCurrentPosition(function(position) {
	    		  const long = position.coords.longitude;
	    		  const lati  = position.coords.latitude;  
  	    		 	if (lati && long) {
						GetCity(lati+'+'+long )
  	    		 	}
				})
		    } else {
		      alert("Browser Does not support Geo Location");
		    }
	}, [])

	const GetCity = async(position) =>{
			const data = await FetchCity(position)
		 	SetGetSearch(data.results[0].components.city);
		 	document.getElementById('SearchBtnId').click()

	} 

	const SearchBtn = async () =>{
		const data = await FetchWeather(Search);
		SetGetSearch('');
		setWeather(data);
	}

	return(
		<div className="container text-center pt-5 hero-div">
			<input className="saerch-input" type="text" value={Search} onChange={(e)=>SetGetSearch(e.target.value)} />
			<div className="pt-2">
				<button className="btn btn-primary" id="SearchBtnId" onClick={()=>SearchBtn()}>Search</button>
			</div>
				{weather.main && (
					<div className="pt-3">
						<div className="card weather-info">
						  <div className="card-body">
						    <h4>{weather.name} <sup><span className="badge badge-pill badge-warning">{weather.sys.country}</span></sup></h4>
						    <h4>{Math.round(weather.main.temp)} <sup><span className="badge badge-pill badge-warning">&deg;C</span></sup></h4>
                            <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
						  </div>
                          <p>{weather.weather[0].description}</p>
						</div>
					</div>
				)}
		</div>

		)
}


export default App