import OpenWeatherMap from "openweathermap-ts"
import { LRUCache } from "lru-cache"
import { RawForecast, RawForecastSegment, DailyForecast, HourlyForecast, CityForecast } from "./weather.d"
import { parse } from "path";

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
    apiKey: process.env.OPEN_WEATHER_API_KEY as string
};

class WeatherService {
    cache:LRUCache<number, RawForecast>;
    weatherAPI:OpenWeatherMap;

    constructor() {
        this.cache = new LRUCache(cacheConfig);
        this.weatherAPI = new OpenWeatherMap(weatherConfig);
    }

    async getForecastForZip(zipCode:number):Promise<CityForecast> {
        let rawForecast = this.cache.get(zipCode);
        if(!rawForecast) {
            rawForecast = await this.weatherAPI.getByZipcode(zipCode, "forecast") as RawForecast;
            this.cache.set(zipCode, rawForecast);
        }

        return this.parseRawForecast(rawForecast);
    }

    parseRawForecast(raw: RawForecast): CityForecast {
        const parsed: CityForecast = {
            name: raw.city.name,
            daily: new Array<DailyForecast>()
        };

        const dayMap = new Map<string, DailyForecast>();

        raw.list.forEach((hour) => {
            const date = new Date(hour.dt * 1000);
            let timeZone = "";
            if(raw.city.timezone >= 0){
                timeZone += "+";
            } else {
                timeZone += "-";
            }
            timeZone += `${("00" + Math.min(Math.abs(raw.city.timezone)/(60*60))).slice(-2)}:${("00"+Math.min(Math.abs(raw.city.timezone)/60)%60).slice(-2)}`;
            const dateKey = date.toLocaleDateString('en-US', {timeZone});

            let day = dayMap.get(dateKey);
            if(!day){
                day = {
                    date,
                    timeZone,
                    temp: 0,
                    highTemp: 0,
                    lowTemp: 0,
                    pop: 0,
                    icon: 'someUrl',
                    hourly: new Array<HourlyForecast>()
                } as DailyForecast 
                dayMap.set(dateKey, day);
                parsed.daily.push(day);
            }

            day.hourly.push({
                time: date,
                timeZone,
                temp: hour.main.temp,
                highTemp: hour.main.temp_max,
                lowTemp: hour.main.temp_min,
                pop: 0,
                icon: hour.weather[0].icon
            } as HourlyForecast);

        });

        return parsed;
    }
}

export default new WeatherService();
export type {DailyForecast, HourlyForecast, CityForecast};
