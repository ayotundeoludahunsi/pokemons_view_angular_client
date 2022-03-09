import { NamedAPIResource } from "./pokemon.model";

/** extends the NamedAPIResource model to include id, url and  image_url*/
export interface PokemonResult
{
   next: string;
   previous: string;
   count: number;
   results : NamedAPIResource[];
   /** keeps the page number for this result */
   pageNumber: number;
}

/** extends the NamedAPIResource model to include id, url and  image_url*/
export enum NavigationPage
{
   previous = 0,
   first = 1,
   next = 2,
   any = 3
}
