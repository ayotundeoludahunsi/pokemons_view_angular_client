import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { Route } from "@angular/router";


/** pokemon routes */
export const routes: Route[] = [
  {
    path: 'pokemon',
    component: PokemonListComponent
  },
  {
    path: 'pokemon/:pokemon_param',
    component: PokemonDetailComponent
  },
  {
     path: '',
     redirectTo: 'pokemon',
     pathMatch: 'full'
  }
]
