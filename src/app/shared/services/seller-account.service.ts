import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Params } from "../interface/core.interface";
import { SellerAccountModel } from "../interface/seller-account.interface";

@Injectable({
  providedIn: "root",
})
export class SellerAccountService {
  constructor(private http: HttpClient) {}

  getSellerAccounts(payload?: Params): Observable<SellerAccountModel> {
    return this.http.get<SellerAccountModel>(`${environment.URL}/payment-accounts`, { params: payload });
  }
}
