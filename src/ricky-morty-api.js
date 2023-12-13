import { LitElement, html, css } from "lit";
import "./components/GetData";

class RickyMortyApi extends LitElement {
  static properties = {
    wiki: { type: Array },
  };

  static styles = css`
  :host {
    display:block;
  }
  
  .container{
    text-align:center;

  }

  get-data{
    display-none;
  }

  .card{
    background:#fff;
    border-radius:2px;
    display:inline-block;
    height:300px;
  width:200px;
margin:1rem;
position:relative;
text-align:center;
box-shadow:0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
transition: all  0.3s cubic-bezier(.25,.8,.25, 1)

  }

  .card:hover{
    box-shadow:0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.24);


  }

  .card img{
    width:70%;
  } 

  .title{
    color:green
  }
  `;

  constructor() {
    super();
    this.wiki = [];

    //evento para oir el componente hijo
    this.addEventListener("ApiData", (e) => {
      console.log(e.detail.data);
      this._dataFormat(e.detail.data);
    });
  }

  _dataFormat(data) {
    let characters = [];
    data["results"].forEach((character) => {
      characters.push({
        img: character.image,
        name: character.name,
        species: character.species,
        status: character.status,
      });
    });
    this.wiki = characters;
  }

  render() {
    return html`
      <get-data
        url="https://rickandmortyapi.com/api/character"
        method="GET"
      ></get-data>
      <div class='container'>
        <h2>The <strong class='title'>Ricky and Morty</strong> API</h1>
        ${this.dataTemplate}
      </div>
    `;
  }

  get dataTemplate() {
    return html`
      ${this.wiki.map(
        (character) => html`
          <div class="card">
            <div class="card-content">
              <h2>${character.name}</h2>
              <img src="${character.img}" />
              <p>${character.species} | ${character.status}</p>
            </div>
          </div>
        `
      )}
    `;
  }
}

customElements.define("ricky-morty-api", RickyMortyApi);
