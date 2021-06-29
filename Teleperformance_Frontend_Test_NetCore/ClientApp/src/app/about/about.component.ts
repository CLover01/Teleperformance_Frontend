import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'about-data',
  templateUrl: './about.component.html'
})
export class AboutComponent {
  public companies: Company[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Company[]>(baseUrl + 'companies').subscribe(result => {
      this.companies = result;
    }, error => console.error(error));
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
