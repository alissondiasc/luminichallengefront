import {Component} from '@angular/core';
import {LuminiApiService} from "./services/lumini-api.service";
import {CalculateAverageRequest} from "./models/calculate-average-request";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cnpjModel: any;
  adreesResponse: any;
  valorA: number | undefined;
  valorB: number | undefined;
  average: Number | undefined;

  constructor(private service: LuminiApiService) {
  }

  isValid():boolean{

    return this.cnpjModel.length ==14;
  }


  async getAddresByCnpj(cnpj: string) {
    const request = cnpj.replace(/[^0-9]/g, '')
    try{
      this.adreesResponse = await this.service.getAnddressByCnpj(request).toPromise();
    }catch (e){

      alert("CNPJ Inválido")
    }

  }

  cleanAddress() {
    this.adreesResponse = null;
    this.cnpjModel = null;
  }

  async calculateAverage(){
    const request: any= {
      notes:[this.valorB, this.valorA]
    };
    this.average = await this.service.calculateAverage(request).toPromise()

  }

  clearAverege(){
    this.average = undefined;
    this.valorB= undefined;
    this.valorA = undefined;
  }
}
