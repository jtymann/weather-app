'use client'
import Image from "next/image";
import { redirect } from 'next/navigation'
import { Input } from "postcss";
import { HTMLInputTypeAttribute } from "react";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 sm:items-start gap-10">
          <form onSubmit={(event) => {
              event.preventDefault();
              redirect(`/weather/${(event.currentTarget.elements[0] as any).value}`);
            }}>
            <div className="grid gap-6 mb-6 grid-cols-1">
              <label htmlFor="zip" className="block mb-2.5 text-2xl font-medium text-heading">Welcome to jWeather, please input your zipcode to get your weather forecast:</label>
              <input type="zip" id="zip" className="border text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full placeholder:text-body p-2" placeholder="07304" pattern="[0-9]{5}" required />
              <input type="submit" className="rounded-lg dark:bg-gray-800 bg-gray-300 p-2" value="Submit"/>
            </div>
          </form>
      </main>
    </div>
  );
}
