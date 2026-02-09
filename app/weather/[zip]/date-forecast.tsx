import { DailyForecast, HourlyForecast } from "services/weather"

type TimeslotProps = {
  hour: HourlyForecast;
}

function TimeSlot({hour}: TimeslotProps) {
  return (
    <div className="flex flex-row">
      <div>{hour.time.toLocaleTimeString()}</div>
      <div>{hour.temp}</div>
      <div>{hour.highTemp}/{hour.lowTemp}</div>
      <div><img src={`https://openweathermap.org/payload/api/media/file/${hour.icon}.png`} /></div>
    </div>
  );
}

type WeatherProps = {
  forecast: DailyForecast;
}

export default function DateForecast({forecast}: WeatherProps) {
  return (
    <div>
      <h1>{forecast.date.toLocaleDateString()}</h1>
      <div className="flex flex-col">
        {
          forecast.hourly.map((hour, index) => {
            return <TimeSlot hour={hour} key={index}/>
          })
        }
      </div>
    </div>
  );
}