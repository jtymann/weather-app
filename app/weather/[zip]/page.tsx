import weather from "services/weather";

export default async function Page({
  params,
}: {
  params: Promise<{ zip: number }>
}) {
  const { zip } = await params;
  const weatherData = await weather.getForecastForZip(zip);
 
  return (
    <div>
      <main>
        <p>{JSON.stringify(weatherData, null, 2)}</p>
        {/* ... */}
      </main>
    </div>
  )
}