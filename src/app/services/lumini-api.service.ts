import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AddressReponse} from "../models/addressReponse";
import {catchError, retry} from "rxjs/operators";
import {CalculateAverageRequest} from "../models/calculate-average-request";

@Injectable({
  providedIn: 'root'
})
export class LuminiApiService {

  url = 'https://luminichallenged.herokuapp.com/'; // api rest fake

  pathAddres = '/api/v1/address'
  pathCalculate = 'api/v1/calculate'

  constructor(private httpClient: HttpClient) {
  }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  // Obtem todos os carros
  getAnddressByCnpj(cnpj: string): Observable<AddressReponse> {
    return this.httpClient.get<AddressReponse>(this.url + this.pathAddres + "/cnpj/" + cnpj)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  calculateAverage(request: CalculateAverageRequest): Observable<Number> {
    return this.httpClient.post<Number>(this.url + this.pathCalculate + "/average", JSON.stringify(request), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
