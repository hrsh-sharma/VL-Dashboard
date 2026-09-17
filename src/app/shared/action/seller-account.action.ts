import { Params } from "../interface/core.interface";

export class GetSellerAccounts {
  static readonly type = "[Seller Account] Get";
  constructor(public payload?: Params) {}
}
