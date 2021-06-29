import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-registration-component',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent {
  public currentCount = 0;
  _http: HttpClient = null;
  _baseUrl: string = null;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._http = http;
    this._baseUrl = baseUrl;
  }

  public ValidateId() {
    const id = (document.getElementById("txtId") as HTMLInputElement).value;
    this._http.get<number>(this._baseUrl + 'identifications/' + id).subscribe(result => {
      alert("Identification " + id + " is valid. Please click the Registration button to continue.");

      (document.getElementById("continue-panel") as HTMLDivElement).hidden = true;
      (document.getElementById("details-panel") as HTMLDivElement).hidden = false;

      this._http.get<Company>(this._baseUrl + "companies/" + id).subscribe(result => {
        (document.getElementById("idtype") as HTMLSelectElement).value = result.type;
        (document.getElementById("idnumber") as HTMLInputElement).value = result.id.toString();
        (document.getElementById("idname") as HTMLInputElement).value = result.name;
        (document.getElementById("idfirstname") as HTMLInputElement).value = result.firstname;
        (document.getElementById("idfirstlastname") as HTMLInputElement).value = result.firstlastname;
        (document.getElementById("idsecondname") as HTMLInputElement).value = result.secondname;
        (document.getElementById("idsecondlastname") as HTMLInputElement).value = result.secondlastname;
        (document.getElementById("idemail") as HTMLInputElement).value = result.email;
        (document.getElementById("idaddress") as HTMLInputElement).value = result.address;
        (document.getElementById("idmuniaddress") as HTMLInputElement).value = result.municipalityaddress;
        (document.getElementById("idphone") as HTMLInputElement).value = result.phone;
      });
    }, error => {
        if (error.status == 404) {
          alert("Identification " + id + " is invalid and cannnot be registered.");
        }
        else {
          alert(error.message + " Please retry again!");
        }
    });
  }

  public Post() {
    const id = (document.getElementById("idnumber") as HTMLInputElement).value;
    let company: Company = {
      id: parseInt(id),
      type: (document.getElementById("idtype") as HTMLSelectElement).value,
      name: (document.getElementById("idname") as HTMLInputElement).value,
      firstname: (document.getElementById("idfirstname") as HTMLInputElement).value,
      firstlastname: (document.getElementById("idfirstlastname") as HTMLInputElement).value,
      secondname: (document.getElementById("idsecondname") as HTMLInputElement).value,
      secondlastname: (document.getElementById("idsecondlastname") as HTMLInputElement).value,
      email: (document.getElementById("idemail") as HTMLInputElement).value,
      address: (document.getElementById("idaddress") as HTMLInputElement).value,
      municipalityaddress: (document.getElementById("idmuniaddress") as HTMLInputElement).value,
      phone: (document.getElementById("idphone") as HTMLInputElement).value
    };

    this._http.put(this._baseUrl + 'companies/' + id, company).subscribe(result =>
      alert("Updated!"), error =>
      alert(error.message + " Please retry again!"));
  }
}

interface Company {
  id: number;
  type: string;
  name: string;
  firstname: string;
  secondname: string;
  firstlastname: string;
  secondlastname: string;
  email: string;
  address: string;
  municipalityaddress: string;
  phone: string;
}
