import axios from 'axios';
import env from "react-dotenv";

const URL = env.URL;
const API_KEY = env.API_KEY;

const GeoUrl = env.GeoUrl;
const TOKEN_KEY = env.TOKEN_KEY;

export const FetchWeather = async(query) => {
	const {data} = await axios.get(URL, {
		params:{
			q: query,
			units: 'metric',
			APPID: API_KEY
		}
	})

	return data;
}


export const FetchCity = async(position) =>{
	const {data} = await axios.get(GeoUrl,{
		params:{
			q: position,
			key: TOKEN_KEY
		}
	})
	return data;
}