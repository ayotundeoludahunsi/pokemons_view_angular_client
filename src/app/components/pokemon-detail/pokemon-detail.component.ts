import { environment } from './../../../environments/environment';
import { Pokemon } from './../../models/pokemon/pokemon.model';
import { PokemonService } from './../../services/pokemon.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit, OnDestroy {

  private pokemonParam : any;
  public pokemon: Pokemon;
  public sprite_image_url = "";
  public progress_bg_colors: string[];
  public routeSubscription: Subscription;
  public isPokemonFound: boolean;
  public isLoading: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private pokemonService: PokemonService)
  {
          /** subscribing to params observable in ActivatedRoute to pick the param needed to fetch a specific pokemon using the id/name */
          this.routeSubscription = this.route.params.subscribe(params => {
          this.pokemonParam = params?.pokemon_param
          this.isLoading = true;
          this.getAPokemon(this.pokemonParam);
      }, error => {this.isLoading = false; this.isPokemonFound = false; });
  }

  ngOnInit(): void {
    this.sprite_image_url = environment.pokemon_image_url;
    this.progress_bg_colors = ['success', 'info', 'warning', 'primary', 'danger', 'secondary'];
  }

  /** Get a Pokemon by id or name */
  public getAPokemon(param: any)
  {
      this.pokemonService.getAPokemon(param)
     .subscribe(response=> {
        this.isPokemonFound = true;
        this.getAPokemonSpecies(param, response)
      }, error=> {this.isLoading = false; this.isPokemonFound = false;})
  }

/** Get a Pokemon Species by id or name */
  public getAPokemonSpecies(param: any, pokemon:Pokemon)
  {
      this.pokemonService.getAPokemonSpecies(param)
      .pipe(finalize(()=> {
        this.isLoading = false;
        }))
      .subscribe(response=> {
         pokemon.speciesDetails = response;
         this.pokemon = pokemon;

         //store the retrieved pokemon for reusability
         this.pokemonService.pokemons.push(pokemon)
      })
  }

  /** Navigate to back to the Pokemons last opened page */
  public navigateToListPage()
  {
      this.router.navigate(['pokemon'], {queryParams: {page: this.pokemonService.currentPageNumber}})
  }

  /** unsubscribe from the route subscription to free up resource */
  ngOnDestroy(): void {
    try
    {
      this.routeSubscription.unsubscribe();
    }catch(e){}
  }

}
