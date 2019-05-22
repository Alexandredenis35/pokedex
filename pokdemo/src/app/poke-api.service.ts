import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from './pokemon';
import { resolve } from 'url';
import { reject, async } from 'q';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  id: string;
  reset: boolean = true;

  tabpokemons = [];


  constructor(private http: HttpClient) { }

  getPokeObservable(start: string, fin: string): Observable<any> {
    return this.http.get("https://pokeapi.co/api/v2/pokemon/?offset=" + start + "&limit=" + fin);
  }

  getTypeObservable(id: string): Observable<any> {
    return this.http.get("https://pokeapi.co/api/v2/pokemon/" + id);
  }

  getDescriptionObservable(id: string): Observable<any> {
    return this.http.get("https://pokeapi.co/api/v2/pokemon-species/" + id);
  }



  getTypePokemons(id: string) {

    return new Promise((resolve, reject) => {

      this.http.get("https://pokeapi.co/api/v2/pokemon/" + id, { responseType: 'text' })
        .subscribe(
          (data) => {

            var infopokemons = JSON.parse(data);
            if (infopokemons.types.length > 1) {
              resolve(infopokemons.types[1].type.name);
            }
            else {
              resolve(infopokemons.types[0].type.name);
            }


          },
          err => {
            console.log("err : " + err.message);
            reject();
          }
        )

    });


  }
  getDescriptionPokemons(id: string) {

    return new Promise((resolve, reject) => {

      this.http.get("https://pokeapi.co/api/v2/pokemon-species/" + id, { responseType: 'text' })
        .subscribe(
          (data) => {

            var descriptionpokemons = JSON.parse(data);

            for (var i = 0; i < descriptionpokemons.flavor_text_entries.length; i++) {

              if (descriptionpokemons.flavor_text_entries[i].language.name.toString() == 'en') {

                console.log(descriptionpokemons.flavor_text_entries[i].flavor_text)

                resolve(descriptionpokemons.flavor_text_entries[i].flavor_text);

              }

            }

            //  console.log(descriptionpokemons.flavor_text_entries[2].flavor_text);
          },
          err => {
            console.log("err : " + err.message);
            reject();
          }
        )

    });

  }


  getPokemons(start: string, fin: string) {
    if (this.reset == true) {
      this.tabpokemons = [];

    }
    var index = parseInt(start);


    return new Promise((resolve, reject) => {


      this.http.get("https://pokeapi.co/api/v2/pokemon/?offset=" + start + "&limit=" + fin, { responseType: 'text' })
        .subscribe(
          async (data) => {

            var datapokemon = JSON.parse(data);

            for (var i = 0; i < datapokemon.results.length; i++) {

              var name = datapokemon.results[i].name;
              await this.getTypePokemons((index + 1).toString()).then(async (a) => {
                var type = a;

                await this.getDescriptionPokemons((index + 1).toString()).then((desc) => {
                  var des = desc;
                  console.log("des",des)
                  this.tabpokemons.push(new Pokemon(this.tabpokemons.length + 1, name, type.toString(), des.toString()));
                });
              })
              index++;


            }

            console.log("test",this.tabpokemons)



            resolve(this.tabpokemons);


          },
          err => {
            console.log("err : " + err.message);
            reject();
          }
        )

    });

  }

}

