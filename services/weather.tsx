import OpenWeatherMap from "openweathermap-ts"
import { LRUCache } from "lru-cache"

/*
    For purposes of this app we are using a simple LRU cache as
    we should have some for of caching when hitting a public API. 
    In a full deployment this should be swapped out with calls 
    to a redis server
*/
const cacheConfig = {
    max: 500,
    ttl: 1000 * 30
};

const weatherConfig = {
    apiKey: process.env.OPEN_WEATHER_API_KEY // TODO Set to env var before commiting
};

type ForecastDay = {
    coord: {
        lon: number;
        lat: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

type Forecast = {
    cod: number;
    message: number;
    cnt: number;
    list: Array<ForecastDay>;
    city: {
        id: number;
        name: string;
        coord: {
            lat: number;
            lon: number;
        }
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    }

};

class WeatherService {
    cache:LRUCache<number, Forecast>;
    weatherAPI:OpenWeatherMap;

    constructor() {
        this.cache = new LRUCache(cacheConfig);
        this.weatherAPI = new OpenWeatherMap(weatherConfig);
    }

    async getForecastForZip(zipCode:number):Promise<Forecast> {
        const cachedValue = this.cache.get(zipCode);
        if(cachedValue) {
            return cachedValue;
        } else {
            const fetchedValue = await this.weatherAPI.getByZipcode(zipCode, "forecast") as Forecast;
            this.cache.set(zipCode, fetchedValue);
            return fetchedValue;
        }
    }
}

export default new WeatherService();
