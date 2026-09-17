import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Params } from "../interface/core.interface";
import { SellerKycModel, SellerKycRecord } from "../interface/seller-kyc.interface";

@Injectable({
  providedIn: "root",
})
export class SellerKycService {
  constructor(private http: HttpClient) {}

  getKycRecords(payload?: Params): Observable<SellerKycModel> {
    return this.http.get<SellerKycModel>(`${environment.URL}/vendor-store-kyc`, { params: payload });
  }

  // Placeholder for getting a single record if backend supports it. If not, we fetch from list.
  // Actually, we'll just pass the ID if needed. Let's provide a method.
  getKycRecord(id: number): Observable<SellerKycRecord> {
    return this.http.get<SellerKycRecord>(`${environment.URL}/vendor-store-kyc/${id}`);
  }

  approveDocument(kycId: number, docType: string): Observable<any> {
    // Expected to be updated to match the actual backend API
    return this.http.put<any>(`${environment.URL}/vendor-store-kyc/${kycId}/approve-document`, { document_type: docType });
  }

  declineDocument(kycId: number, docType: string, reason: string): Observable<any> {
    // Expected to be updated to match the actual backend API
    return this.http.put<any>(`${environment.URL}/vendor-store-kyc/${kycId}/decline-document`, { document_type: docType, remark: reason });
  }
}
