type RawForecastSegment = {
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
    pop: number;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

type RawForecast = {
    cod: number;
    message: number;
    cnt: number;
    list: Array<RawForecastSegment>;
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

type HourlyForecast = {
    time: Date;
    timeZone: string;
    temp: number;
    highTemp: number;
    lowTemp: number;
    pop: number;
    icon: string;
}

type DailyForecast = {
    date: Date;
    timeZone: string;
    temp: number;
    highTemp: number;
    lowTemp: number;
    pop: number;
    icon: string;
    hourly: Array<HourlyForecast>;
}

type CityForecast = {
    name: string;
    daily: Array<DailyForecast>;
}

export type { RawForecast, RawForecastSegment, DailyForecast, HourlyForecast, CityForecast };