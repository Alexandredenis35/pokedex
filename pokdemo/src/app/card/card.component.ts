import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { PokeApiService } from '../poke-api.service';
import { DomSanitizer } from '@angular/platform-browser'


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() pokemon: string;
  @Input() type: string;
  @Input() id: string;
  @Input() description: string;
  display: boolean = false;
  img: boolean = true;
  arrayStat = [];
  Statmax = [180, 230, 194, 230, 190, 255];
  alreadydisplay: boolean = false;

  constructor(private dom: DomSanitizer, private pokeservice: PokeApiService) {

  }

  ngOnInit() {
  }
  progress(i: number) {
    console.log((this.arrayStat[i].value / this.Statmax[i]) * 100)
    return this.dom.bypassSecurityTrustStyle("width:" + (this.arrayStat[i].value / this.Statmax[i]) * 100 + "%");
  }

  backgroundcolor() {
    var res;
    switch (this.type) {
      case "bug":
        res = { 'background-color': '   #ccff99' };
        break;
      case "rock":
        res = { 'background-color': '    #ffbb99' };
        break;
      case "ice":
        res = { 'background-color': '    #cceeff' };
        break;
      case "ground":
        res = { 'background-color': '    #cc6600  ' };
        break;
      case "psychic":
        res = { 'background-color': '  #cc0099' }
        break;
      case "fighting":
        res = { 'background-color': '  #666699' }
        break;
      case "fairy":
        res = { 'background-color': ' #ffe6ff' }
        break;
      case "electric":
        res = { 'background-color': '  #ffff66' };
        break;
        case "ghost":
        res = { 'background-color': '  #404040' };
        break;
      case "grass":
        res = { 'background-color': ' #00b300' };
        break;
      case "fire":
        res = { 'background-color': ' #ff4d4d' };
        break;
      case "water":
        res = { 'background-color': '#99e6ff' };
        break;
      case "normal":
        res = { 'background-color': ' #cccccc' };
        break;
      case "fairy":
        res = { 'background-color': '  #ffffff' };
        break;
      case "poison":
        res = { 'background-color': '  #ff99ff' };
        break;


    }
    return res;
  }
  getUrl() {

    return "https://www.pokebip.com/pokedex-images/artworks/" + this.id + ".png";

  }

  getName() {
    return "#" + this.id + " " + this.pokemon;
  }




  showDialog() {


    this.display = true;
    this.pokeservice.getTypeObservable(this.id).subscribe(data => {
      data.stats.forEach(element => {
        var value = element.base_stat;
        var stat = element.stat.name;
        let obj = { "stat": stat, "value": value };
        this.arrayStat.push(obj);
      });
      console.log(this.arrayStat)
    });
  }



}

