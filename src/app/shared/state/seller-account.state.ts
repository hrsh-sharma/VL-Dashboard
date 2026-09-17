import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { GetSellerAccounts } from "../action/seller-account.action";
import { SellerAccountModel } from "../interface/seller-account.interface";
import { SellerAccountService } from "../services/seller-account.service";

export class SellerAccountStateModel {
  account = {
    data: [] as any[],
    total: 0
  };
}

@State<SellerAccountStateModel>({
  name: "seller_account",
  defaults: {
    account: {
      data: [],
      total: 0
    }
  },
})
@Injectable()
export class SellerAccountState {
  
  constructor(private sellerAccountService: SellerAccountService) {}

  @Selector()
  static account(state: SellerAccountStateModel) {
    return state.account;
  }

  @Action(GetSellerAccounts)
  getSellerAccounts(ctx: StateContext<SellerAccountStateModel>, action: GetSellerAccounts) {
    return this.sellerAccountService.getSellerAccounts(action.payload).pipe(
      tap({
        next: (result: SellerAccountModel) => {
          ctx.patchState({
            account: {
              data: result.data,
              total: result?.total ? result?.total : result.data?.length
            }
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }
}
