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
      <main className="flex flex-col min-w-screen justify-center items-center">
          <h1 className="text-3xl font-bold underline grow mt-10 mb-10">Weather for {forecast.name}</h1>
          <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 ">
            {
              forecast.daily.map((daily, index) => {
                if(index < 5){
                  return <DateForecast forecast={daily} key={index}/>
                }
              })
            }
          </div>
      </main>
    </div>
  )
}