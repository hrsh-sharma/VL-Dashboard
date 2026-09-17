import { Params } from "../interface/core.interface";

export class GetKycRecords {
  static readonly type = "[SellerKyc] Get";
  constructor(public payload?: Params) {}
}

export class GetKycRecord {
  static readonly type = "[SellerKyc] Get Record";
  constructor(public id: number) {}
}

export class ApproveDocument {
  static readonly type = "[SellerKyc] Approve Document";
  constructor(public id: number, public docType: string) {}
}

export class DeclineDocument {
  static readonly type = "[SellerKyc] Decline Document";
  constructor(public id: number, public docType: string, public reason: string) {}
}
