
import { NavigationPage as PageNavigation, PokemonResult } from './../models/pokemon/utility.model';
import { Pokemon, PokemonSpecies } from '../models/pokemon/pokemon.model';
import { environment } from './../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http"
import { Observable, of } from "rxjs";

/** pokemon endpoints */
export enum endpoints {
  pokemon = 'pokemon',
  pokemon_species = 'pokemon-species'
}

@Injectable()
export class PokemonService {

  private _nextPageUrl = '';
  private _previousPageUrl = '';
  private _currentPageNavigation = PageNavigation.first;
  private _currentPageNumber: number;
  private _pokemons: Pokemon[] = [];
  private _pokemonsResults: PokemonResult[] = [];

  constructor(private http: HttpClient) { }

  /**sets and stores the next page url through the a pokemon result*/
  public set nextPageUrl(_nextPageUrlParam: string) {
    this._nextPageUrl = _nextPageUrlParam;
  }

 /**gets the next page url through the a pokemon result*/
  public get nextPageUrl() {
    return this._nextPageUrl;
  }

 /**sets and stores the previous page url through the a pokemon result*/
  public set previousPageUrl(_previousPageUrlParam: string) {
    this._previousPageUrl = _previousPageUrlParam;
  }

 /**gets the previous page url through the a pokemon result*/
  public get previousPageUrl() {
    return this._previousPageUrl;
  }

  /**sets and stores the current pagination status for use after returning to the list page from detail page */
  public set currentPageNavigation(_currentPageNavigationParam: PageNavigation) {
    this._currentPageNavigation = _currentPageNavigationParam;
  }

 /**gets the current pagination status for use after returning to the list page from detail page */
  public get currentPageNavigation() {
    return this._currentPageNavigation;
  }

 /**sets and stores the current page number for use after returning to the list page from detail page */
  public set currentPageNumber(_currentPageNumberParam: number) {
    this._currentPageNumber = _currentPageNumberParam;
  }

 /**gets the current page number for use after returning to the list page from detail page */
  public get currentPageNumber() {
    return this._currentPageNumber;
  }

  /** sets and stores the pokemon array with an item for reusability after retrieving a pokemon */
  public set pokemons(_pokemonsParam: Pokemon[]) {
    this._pokemons = _pokemonsParam;
  }

  /** gets the pokemon array for reusability */
  public get pokemons() {
    return this._pokemons;
  }

  /** sets and stores the pokemonResults array with an item for reusability after retrieving a pokemon list */
  public set pokemonsResults(_pokemonsResultsParam: PokemonResult[]) {
    this._pokemonsResults = _pokemonsResultsParam;
  }

  /** gets the pokemonResults array for reusability */
  public get pokemonsResults() {
    return this._pokemonsResults;
  }

  /** get list of pokemons and load results based of chosen limit - default is 50 for this application*/
  getPokemons(pageNumber: number, page: PageNavigation, offset: number = 0): Observable<PokemonResult> {

    /**check if pokemon results already exists in the stored array for this page to promote data sharing */
    const pokemonResult = this.pokemonsResults.find((pokemon: PokemonResult) => {
      return +pokemon.pageNumber == +pageNumber
    })

    /** return pokemon results as an observable if it exists else connect the respective endpoints*/
    if (pokemonResult) {
      return of(pokemonResult)
    }

    if (page == PageNavigation.next) {
      return this.http.get<PokemonResult>(this.nextPageUrl)
    }
    else if (page == PageNavigation.previous) {
      return this.http.get<PokemonResult>(this.previousPageUrl)
    }
    else if (page == PageNavigation.any) {
      const url = `${environment.base_url}/${endpoints.pokemon}`;
      let _params = new HttpParams().append('offset', offset + "").append('limit', environment.pokemon_api_offset_limit + "");
      return this.http.get<PokemonResult>(url, { params: _params })
    }
    else if (page == PageNavigation.first) {
      const url = `${environment.base_url}/${endpoints.pokemon}`;
      let _params = new HttpParams().append('offset', "0").append('limit', environment.pokemon_api_offset_limit + "");
      return this.http.get<PokemonResult>(url, { params: _params })
    }

  }

  /** gets a pokemon from the pokemon api */
  getAPokemon(param: any): Observable<Pokemon> {

     /**check if pokemon already exists in the stored array to promote data sharing */
    const pokemon = this.pokemons.find((pokemon: Pokemon) => {
      return +pokemon.id == +param || pokemon.name == param
    })

     /** return pokemon as an observable if it exists else connect to the api */
    if (pokemon) {
      return of(pokemon)
    } else {
      return this.http.get<Pokemon>(`${environment.base_url}/${endpoints.pokemon}/${param}`)
    }
  }


  /** gets a pokemon species from the pokemon api */
  getAPokemonSpecies(param: any): Observable<PokemonSpecies> {
    return this.http.get<PokemonSpecies>(`${environment.base_url}/${endpoints.pokemon_species}/${param}`)
  }



}
