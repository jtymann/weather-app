import weather from "services/weather";

export default async function CurrentWeatherPage({
  params,
}: {
  params: Promise<{ zip: number }>
}) {
  const { zip } = await params;
  const currentWeather = await weather.getCurrentWeatherForZip(zip);
 
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex flex-col w-full max-w-3xl items-center py-16 px-8 gap-8">
        <h1 className="text-4xl font-bold text-heading">
          Current Weather for {currentWeather.name}
        </h1>
        
        <div className="rounded-3xl w-full p-8 dark:bg-gray-800 bg-gray-300 shadow-lg">
          <div className="flex flex-col gap-6">
            {/* Main weather display */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-6xl font-bold">
                  {Math.round(currentWeather.main.temp)}°F
                </span>
                <span className="text-2xl text-gray-600 dark:text-gray-400 capitalize">
                  {currentWeather.weather[0].description}
                </span>
              </div>
              <img 
                className="w-32 h-32" 
                src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`}
                alt={currentWeather.weather[0].description}
              />
            </div>

            {/* Weather details */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col p-4 rounded-lg dark:bg-gray-700 bg-gray-200">
                <span className="text-sm text-gray-600 dark:text-gray-400">Feels Like</span>
                <span className="text-2xl font-semibold">
                  {Math.round(currentWeather.main.feels_like)}°F
                </span>
              </div>
              
              <div className="flex flex-col p-4 rounded-lg dark:bg-gray-700 bg-gray-200">
                <span className="text-sm text-gray-600 dark:text-gray-400">Humidity</span>
                <span className="text-2xl font-semibold">
                  {currentWeather.main.humidity}%
                </span>
              </div>
              
              <div className="flex flex-col p-4 rounded-lg dark:bg-gray-700 bg-gray-200">
                <span className="text-sm text-gray-600 dark:text-gray-400">High / Low</span>
                <span className="text-2xl font-semibold">
                  {Math.round(currentWeather.main.temp_max)}° / {Math.round(currentWeather.main.temp_min)}°
                </span>
              </div>
              
              <div className="flex flex-col p-4 rounded-lg dark:bg-gray-700 bg-gray-200">
                <span className="text-sm text-gray-600 dark:text-gray-400">Wind Speed</span>
                <span className="text-2xl font-semibold">
                  {Math.round(currentWeather.wind.speed)} mph
                </span>
              </div>
              
              <div className="flex flex-col p-4 rounded-lg dark:bg-gray-700 bg-gray-200">
                <span className="text-sm text-gray-600 dark:text-gray-400">Pressure</span>
                <span className="text-2xl font-semibold">
                  {currentWeather.main.pressure} hPa
                </span>
              </div>
              
              <div className="flex flex-col p-4 rounded-lg dark:bg-gray-700 bg-gray-200">
                <span className="text-sm text-gray-600 dark:text-gray-400">Visibility</span>
                <span className="text-2xl font-semibold">
                  {(currentWeather.visibility / 1609).toFixed(1)} mi
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Link to forecast */}
        <a 
          href={`/weather/${zip}`}
          className="text-lg text-blue-600 dark:text-blue-400 hover:underline"
        >
          View 5-Day Forecast →
        </a>
      </main>
    </div>
  );
}
