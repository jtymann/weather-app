import weather from "services/weather";
import DateForecast from "./date-forecast";

export default async function Page({
  params,
}: {
  params: Promise<{ zip: number }>
}) {
  const { zip } = await params;
  const forecast = await weather.getForecastForZip(zip);
 
  return (
    <div>
      <main>
        <div className="flex flex-col min-w-screen justify-center items-center">
          <h1 className="text-3xl font-bold underline grow">Weather for {forecast.name}</h1>
          <div className="flex">
            {
              forecast.daily.map((daily, index) => {
                if(index < 5){
                  return <DateForecast forecast={daily} key={index}/>
                }
              })
            }
          </div>
        </div>

      </main>
    </div>
  )
}