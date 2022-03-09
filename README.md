## Basic Pokémon directory App

A Pokémon directory allowing users to browse all available Pokémons and view each in greater detail.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.5.
	

## Code Logic

* The App contains a List page that shows 50 Pokemons at a glance and a Detail page showing more properties of a particular Pokemon. 
* I implemented pagination, the app loads the first 50 items, and uses the Previous/Next buttons to navigate more items. 
* I added a search feature to the list page with an open source npm plugin (ngx-filter-pipe).
* I extended the requirement to call an additional api route to get the Pokemon color.
 

## API

* The App uses the [PokéAPI](https://pokeapi.co/docs/v2) to get a list of Pokemons.
* And gets a Pokemon details from [GET https://pokeapi.co/api/v2/pokemon/{id or name}/](https://pokeapi.co/docs/v2#pokemon).

    
## Technologies

Project uses:
* Angular
* Boostrap


## Setup

- Install angular cli and npm locally.
- Clone/download the project and launch locally using visual studio code or other IDEs.
- Open terminal on the project directory and run the command `npm install`.
- Run commnd `ng serve --open` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically launch the app in the default browser.


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

