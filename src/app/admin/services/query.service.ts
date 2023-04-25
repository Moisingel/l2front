import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  private url;
  constructor(
    private http: HttpClient,
  ) {
    this.url = environment.backendApi;
  }

  searchPromoter(id: number) {
    return this.http.get(`${this.url}resources/promoter/${id}`);
  }

  searchClient(id: number) {
    return this.http.get(`${this.url}resources/client/${id}`);
  }

  getTransactions(id: number, page: number = 1, perPage: number = 10) {
    return this.http.get(`${this.url}wallet/${id}/transactions`, {params: {page: page.toString(), perPage: perPage.toString()}});
  }

  getBanks() {
    return this.http.get(`${this.url}resources/all-banks`);
  }

  getChannels() {
    return this.http.get(`${this.url}resources/all-channels`);
  }

  getCurrencies() {
    return this.http.get(`${this.url}resources/all-currencies`);
  }

  saveTransaction(data: any) {
    return this.http.post(`${this.url}recharge`, data);
  }

  updateTransaction(data: any, id: number) {
    return this.http.put(`${this.url}recharge/${id}`, data);
  }

}
