import { LitElement } from "lit";

export class GetData extends LitElement {


  static properties = {
    url: { type: String },
    method: { type: String },
  };




  firstUpdated(){
    this.getData()

  }

  constructor() {
    super();
    console.log("get data");

  }

  // comunicacion d hijos a padre necesito mediante un evento con caract como esta
  //custom private  method
  _sendData(data) {
    this.dispatchEvent(
      new CustomEvent("ApiData", {
        detail: { data },
        bubbles: true,
        composed: true,
      })
    );
  }

  getData() {
    fetch(this.url, { method: this.method })
      .then((response) => {
        if (response.ok) return response.json();
        return Promise.reject(response);
      })
      .then((data) => {
        this._sendData(data);
      })
      .catch((error) => {
        console.warn("Something went wrong", error);
      });
  }
}

customElements.define("get-data", GetData);
