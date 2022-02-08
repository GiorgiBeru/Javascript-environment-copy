import { getMovie, getCountry } from "./api";
import { CountryData, MovieData, populationAndRuntime } from "./models";
let input: HTMLInputElement = <HTMLInputElement>(
  document.getElementById("input")
);
let btn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("btn");
let main: HTMLElement = <HTMLElement>document.querySelector("main");
let refreshButton: HTMLButtonElement = <HTMLButtonElement>(
  document.getElementById("refreshButton")
);
let input1: HTMLInputElement = <HTMLInputElement>(
  document.getElementById("input1")
);
let input2: HTMLInputElement = <HTMLInputElement>(
  document.getElementById("input2")
);
let input3: HTMLInputElement = <HTMLInputElement>(
  document.getElementById("input3")
);
let btn2: HTMLButtonElement = <HTMLButtonElement>(
  document.getElementById("button2")
);
//main flow

btn.addEventListener("click", (e) => {
  e.preventDefault();
  let value: string = input.value;
  if (checkIfEmpty(value)) return;
  let key: string = value.split(" ").join("+");
  input.value = "";
  getMovieData(key);
});

refreshButton.addEventListener("click", () => {});

btn2.addEventListener("click", async (e) => {
  e.preventDefault();
  let values: string[] = [input1.value, input2.value, input3.value];
  if (allNotFilled(values)) return;
  let populationAndRuntime: populationAndRuntime[] = await Promise.all(
    values.map((value: string) => getMoviesDatas(value))
  );
  renderTemplateDownwards(populationAndRuntime); //es synchronous aris da let populationAndruntimeshi aris asynchronous da jer es ar unda shesrulebuliyo? shesabamisad promise pendingebi ar unda misvloda?
});

//helper functions
async function getMovieData(key: string) {
  const movie: MovieData = await getMovie(key);
  const countryData: CountryData[] = await Promise.all(
    movie.country.map((name: string) => getCountry(name))
  );
  renderTemplate(movie, countryData);
}

function checkIfEmpty(value: string): boolean {
  if (value === "") {
    alert("Empty input submitted");
    return true;
  }
  return false;
}

function renderTemplate(movie: MovieData, countryData: CountryData[]) {
  let element: HTMLElement = <HTMLElement>document.createElement("div");
  element.innerHTML = `
    <ul>
      <li>Name: ${movie.title}</li>
      <li>Years ago: ${2022 - movie.year}</li>
      <li>Actors: ${movie.actors.map((Fullname: string) => {
        return Fullname.split(" ")[0];
      })}</li>
      <li>Country: ${countriesOutput(movie, countryData)}</li> 
      <li>Currency: ${countryData.map(
        (country: CountryData) => country.currency
      )}</li>
    </ul>
   `;
  main.appendChild(element);
}

function countriesOutput(
  movie: MovieData,
  countryData: CountryData[]
): string[] {
  const arr: string[] = [];
  if (movie.country.length > 1) {
    movie.country.map((country: string, index: number) => {
      arr.push(`${country}:${countryData[index].flags}`);
    });
    return arr;
  } else {
    arr.push(countryData[0].flags);
    return arr;
  }
}

function allNotFilled(values: string[]): boolean {
  if (values.filter((element) => element === "").length > 0) {
    alert("one of the fields seems to be an empty string");
    return true;
  } else {
    return false;
  }
}

async function getMoviesDatas(key: string) {
  const movie: MovieData = await getMovie(key);
  const countryData: CountryData[] = await Promise.all(
    movie.country.map((name: string) => getCountry(name))
  );
  let obj: object = countryData.map((country: CountryData) => {
    return { [country.title]: country.population };
  });

  return { runtime: movie.runtime, nameAndPop: obj };
}

function renderTemplateDownwards(
  populationAndRuntime: populationAndRuntime[]
): void {
  const element: HTMLElement = document.createElement("div");
  let arrayOfRuntime: number[] = populationAndRuntime.map(
    (element: populationAndRuntime) => {
      return element.runtime;
    }
  );
  let nameAndPopArray: object[] = populationAndRuntime.map(
    (element: populationAndRuntime) => {
      return element.nameAndPop;
    }
  );
  nameAndPopArray = nameAndPopArray.flat();
  const uniqueArray = nameAndPopArray.filter((value, index) => {
    const _value = JSON.stringify(value);
    return (
      index ===
      nameAndPopArray.findIndex((obj) => {
        return JSON.stringify(obj) === _value;
      })
    );
  });
  console.log(uniqueArray);
  element.innerHTML = `
  <ul>
    <li>Runtime: ${arrayOfRuntime.reduce((acc, curr) => (acc += curr), 0)} </li>
    <li>Populations: console log-shi logavs uniqueArrays of populations </li>
  </ul>
  `;
  main.appendChild(element);
}
