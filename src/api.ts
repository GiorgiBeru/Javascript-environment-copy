import { MovieData, CountryData } from "./models";

export function getMovie(key: string): Promise<MovieData> {
  return fetch(`http://www.omdbapi.com/?t=${key}&apikey=96efe05f`)
    .then((response) => response.json())
    .then(({ Year, Country, Title, Actors, Runtime }) => {
      return {
        title: Title,
        country: Country.split(", "),
        year: parseInt(Year),
        actors: Actors.split(", "),
        runtime: parseInt(Runtime)
      };
    });
}

export function getCountry(country: string): Promise<CountryData> {
  return fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      return {
        title: country,
        population: data[0].population,
        flags: data[0].flag,
        currency: data[0].currencies[Object.keys(data[0].currencies)[0]].name,
      };
    });
}


