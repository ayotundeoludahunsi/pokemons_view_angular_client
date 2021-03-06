// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

 //default the limit to 20

export const environment = {
  production: false,
  base_url: 'https://pokeapi.co/api/v2',
  pokemon_image_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
  pokemon_api_offset_limit : 50
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
