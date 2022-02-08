export interface MovieData {
  country: string[];
  title: string;
  year: number;
  actors: string[];
  runtime: number;
}

export interface CountryData {
  title: string;
  population: number;
  flags: string;
  currency: string;
}
export interface populationAndRuntime {
  runtime: number,
  nameAndPop: object
}
