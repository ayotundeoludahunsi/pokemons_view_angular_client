import { NavigationPage } from './../../models/pokemon/utility.model';
import { environment } from './../../../environments/environment';
import { Subscription } from 'rxjs';
import { PokemonService } from './../../services/pokemon.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonResult } from 'src/app/models/pokemon/utility.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NamedAPIResource } from 'src/app/models/pokemon/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit, OnDestroy {

  public pokemonResult: PokemonResult;
  public searchTerm : any = { name: '' };
  public pageNumber: number = 1;
  public routerSubscription: Subscription;
  public hasPreviousItems: boolean;
  public hasNextItems: boolean;
  public page: NavigationPage;
  public hasValidPageNumber: boolean;
  public currentOffset: number;

  constructor(private pokemonService: PokemonService, private router: Router, private route: ActivatedRoute) {
    /** subscribing to params observable in ActivatedRoute to pick the param needed to fetch a specific pokemon using the id/name */
    this.routerSubscription = route.queryParams.subscribe(param=> {
         /** subscribing to params observable in ActivatedRoute to pick the param needed to fetch a specific pokemon using the id/name */
         if(param.page)
         {
            if(+param.page < 1)
            {
                this.hasValidPageNumber = false;
            }
            else
            {
              this.hasValidPageNumber = true;
              this.pageNumber = +param.page;
              this.page = this.page || NavigationPage.any;
              this.loadPokemon(this.page);
            }
         }else
         {
           this.hasValidPageNumber = true;
           this.getPageNumber(NavigationPage.first);
           this.loadPokemon(this.page);
         }
      }, error=> { this.hasValidPageNumber = false; })
  }


  ngOnInit(): void {}

  /**loads a list of pokemons from the pokemon service using the current page number and store results in a reusable array */
  public loadPokemon(page: NavigationPage)
  {
      this.currentOffset = this.getPageOffset();
      this.pokemonService.getPokemons(this.pageNumber, page, this.currentOffset)
      .subscribe(response => {

       response.results.map((e : NamedAPIResource)=> {
            e.id = this.getId(e.url);
            e.image_url = `${environment.pokemon_image_url}${e.id}.png`;
        })

        response.pageNumber = +this.pageNumber;
        this.pokemonResult = response;
        this.pokemonService.nextPageUrl = response.next;
        this.pokemonService.previousPageUrl = response.previous;
        this.toggleNavigationButtons(response);

        //store the retrieved pokemon result for reusability
        this.pokemonService.pokemonsResults.push(response)

      }, error => { this.hasValidPageNumber = false; })
  }

/** find the pokemon list's offset */
private getPageOffset()
{
    return (this.pageNumber * environment.pokemon_api_offset_limit) - environment.pokemon_api_offset_limit;
}

/** gets the id from the pokemon url
e.g. url: https://pokeapi.co/api/v2/pokemon/1/ */
private getId(url: string): number {
  const splitUrl = url?.split('/')
  return splitUrl ? +splitUrl[splitUrl.length - 2] : 0;
}


/** get page number to use when activiting a navigation
e.g https://myapp.co.uk/pokemon-directory?page=4 */
private getPageNumber(page: NavigationPage)
{
    if(page == NavigationPage.next)
    {
      this.pageNumber +=  this.hasNextItems ? 1 : 0;
      this.page = NavigationPage.next;
    }
    else if(page == NavigationPage.previous)
    {
      this.pageNumber +=  this.hasPreviousItems ? -1 : 0;
      this.page = NavigationPage.previous;

    }
    else if(page == NavigationPage.first)
    {
      this.pageNumber = 1;
      this.page = NavigationPage.first;
    }

    this.pokemonService.currentPageNavigation = this.page;
}

/** navigates to the details page of a specific pokemon */
public navigateToPokemonDetail(param: string)
{
      this.pokemonService.currentPageNumber = this.pageNumber;
      this.router.navigate(["pokemon/", param])
}

/** navigates to the previous page in the list pagination */
public navigateToPreviousPage()
{
   this.getPageNumber(NavigationPage.previous);
   this.router.navigate(['pokemon'], {queryParams: {page: this.pageNumber}})
}

/** navigates to the next page in the list pagination */
public navigateToNextPage()
{
    this.getPageNumber(NavigationPage.next);
    this.router.navigate(['pokemon'], {queryParams: {page: this.pageNumber}})
}

/** toggles the disabled property of the navigation buttons */
private toggleNavigationButtons(pokemonResult: PokemonResult)
{
    this.hasNextItems =  pokemonResult.next ? true : false;
    this.hasPreviousItems =  pokemonResult.previous ? true : false;
}

/** unsubscribe from the route subscription to free up resource */
ngOnDestroy(): void {
  try
  {
    this.routerSubscription.unsubscribe();
  }catch(e){}
}


}
