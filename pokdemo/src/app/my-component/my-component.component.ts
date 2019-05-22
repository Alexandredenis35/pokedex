import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokeApiService } from '../poke-api.service';
@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponentComponent implements OnInit {
  selectedValue = null;
  searchText: string = null;
  valuetab = 20;
  reset: boolean = this.pokeservice.reset;
  seemore: boolean = true;
  pokemons  = [
    /*  new Pokemon(1,"Pikachu"),
      new Pokemon(2,"PiRaichu"),
      new Pokemon(3,"Bulbizarre"),
      new Pokemon(4,"Salameche"),
      new Pokemon(5,"Tortank")*/
  ];
  nomspokemons =
    [];



  constructor(private pokeservice: PokeApiService) {
  }
  dispall() {
    this.seemore = true;
    this.pokeservice.getPokemons("0", this.valuetab.toString()).then( (value:any)  => {
      console.log("value",value);
      this.pokemons = value;
    });
  }
  go() {

    this.pokeservice.reset = true;
    this.seemore = false;
    console.log("search value " + this.selectedValue + "value : " + this.nomspokemons.indexOf(this.selectedValue));
    if (this.nomspokemons.indexOf(this.selectedValue) != -1) {
      this.getOnePokemons(this.selectedValue);

    }
    console.log("reset tableau " + this.pokeservice.reset);

  }
  getNoms(start: string, fin: string) {
    var index = parseInt(start);
    this.pokeservice.getPokeObservable(start, fin).subscribe(data => {

      var name;

      data.results.forEach((element, i) => {
        name = element.name;

        this.nomspokemons.push(name);


      });
    });
  }

  getOnePokemons(name: string) {
    this.pokeservice.reset = true;
    this.seemore = false;
    var type;
    var description;
    var id;
    this.pokeservice.getTypeObservable((name).toString()).subscribe(datatype => {
      id = datatype.id
      if (datatype.types.length > 1) {
        type = datatype.types[1].type.name;
      }
      else {
        type = datatype.types[0].type.name;
      }
    });

    this.pokeservice.getDescriptionObservable((name).toString()).subscribe(datades => {
      datades.flavor_text_entries.forEach(el => {
        if (el.language.name.toString() == 'en') {
          description = el.flavor_text;
        }
      });
      var poke = [new Pokemon(id, name, type, description)];
      this.pokemons = poke;

    });
  }


  getPokemons(start: string, fin: string) {
    if (this.pokeservice.reset == true) {
      this.pokemons = [];

    }
    var index = parseInt(start);
    this.pokeservice.getPokeObservable(start, fin).subscribe(async data => {

      for (var i = 0; i < (data).results.length; i++) {

        var name;
        var type;
        var description;
        var name = data.results[i].name;
        console.log('name', name);

        await this.pokeservice.getTypeObservable((index + 1).toString()).subscribe(async datatype => {
          if (datatype.types.length > 1) {
            type = datatype.types[1].type.name;
          }
          else {
            type = datatype.types[0].type.name;
          }

          await this.pokeservice.getDescriptionObservable((index + 1).toString()).subscribe(datades => {
            datades.flavor_text_entries.forEach(el => {
              if (el.language.name.toString() == 'en') {
                description = el.flavor_text;
              }
            });
            var poke = new Pokemon(this.pokemons.length + 1, name, type, description);
            console.log("test", poke)
            this.pokemons.push(poke);
          });


        });

        index++;

      }
    });
  }

  more() {
    // this.max=this.max+20;
    this.pokeservice.reset = false;
    console.log("clicked")
    this.pokeservice.getPokemons(this.pokemons.length.toString(), "20").then((value:[]) => {
      this.pokemons = value;
    })



    if (this.pokemons.length >= 807) {
      this.seemore = false;
    }
    console.log("reset tableau " + this.pokeservice.reset);

  }
  ngOnInit() {

    this.pokeservice.getPokemons("0", this.valuetab.toString()).then( (value:any)  => {
      console.log("value",value);
      this.pokemons = value;
    });
    this.getNoms("0", "807");
  }

}
