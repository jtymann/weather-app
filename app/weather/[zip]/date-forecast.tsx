import { DailyForecast, HourlyForecast } from "services/weather"

type TimeslotProps = {
  hour: HourlyForecast;
}

function TimeSlot({hour}: TimeslotProps) {
  let time = hour.time.toLocaleTimeString('en-US', {timeZone: hour.timeZone});
  return (
    <div className="flex flex-row text-base font-normal grow gap-3 h-[2rem]">
        <div className="size-20">{time.split(':')[0]} {time.split(':')[2].split(' ')[1]}</div>
        <div className="grow">{Math.round(hour.temp)}°F</div>
        <img className="w-[2rem] h-[2rem]" src={`https://openweathermap.org/payload/api/media/file/${hour.icon}.png`} />
    </div>
  );
}

type WeatherProps = {
  forecast: DailyForecast;
}

export default function DateForecast({forecast}: WeatherProps) {
  return (
    <div className="text-2xl font-bold rounded-3xl w-fit m-5 p-5 dark:bg-gray-800 bg-gray-300">
      <h1 className="mb-5">{forecast.date.toLocaleDateString('en-US', {
        timeZone: forecast.timeZone,
          weekday: "short",
          year: undefined,
          month: undefined,
          day: "numeric",
      })}</h1>
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