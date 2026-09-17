import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs";
import { GetKycRecords, GetKycRecord, ApproveDocument, DeclineDocument } from "../action/seller-kyc.action";
import { SellerKycRecord } from "../interface/seller-kyc.interface";
import { SellerKycService } from "../services/seller-kyc.service";
import { NotificationService } from "../services/notification.service";

export class SellerKycStateModel {
  kyc = {
    data: [] as SellerKycRecord[],
    total: 0
  };
  selectedKyc: SellerKycRecord | null;
}

@State<SellerKycStateModel>({
  name: "sellerKyc",
  defaults: {
    kyc: {
      data: [],
      total: 0
    },
    selectedKyc: null
  }
})
@Injectable()
export class SellerKycState {
  constructor(private store: Store,
              private notificationService: NotificationService,
              private sellerKycService: SellerKycService) {}

  @Selector()
  static kycRecords(state: SellerKycStateModel) {
    return state.kyc;
  }

  @Selector()
  static selectedKyc(state: SellerKycStateModel) {
    return state.selectedKyc;
  }

  @Action(GetKycRecords)
  getKycRecords(ctx: StateContext<SellerKycStateModel>, action: GetKycRecords) {
    return this.sellerKycService.getKycRecords(action.payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            kyc: {
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

  @Action(GetKycRecord)
  getKycRecord(ctx: StateContext<SellerKycStateModel>, { id }: GetKycRecord) {
    return this.sellerKycService.getKycRecord(id).pipe(
      tap({
        next: result => {
          ctx.patchState({
            selectedKyc: result
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(ApproveDocument)
  approveDocument(ctx: StateContext<SellerKycStateModel>, { id, docType }: ApproveDocument) {
    return this.sellerKycService.approveDocument(id, docType).pipe(
      tap({
        next: result => {
          const state = ctx.getState();
          // Update the specific record in state if returned, or we just rely on component to re-fetch
          if (state.selectedKyc && state.selectedKyc.id === id) {
            // Re-fetch selected KYC to get updated status
            this.store.dispatch(new GetKycRecord(id));
          }
        },
        complete: () => {
          this.notificationService.showSuccess('Document Approved Successfully');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeclineDocument)
  declineDocument(ctx: StateContext<SellerKycStateModel>, { id, docType, reason }: DeclineDocument) {
    return this.sellerKycService.declineDocument(id, docType, reason).pipe(
      tap({
        next: result => {
          const state = ctx.getState();
          if (state.selectedKyc && state.selectedKyc.id === id) {
            this.store.dispatch(new GetKycRecord(id));
          }
        },
        complete: () => {
          this.notificationService.showSuccess('Document Declined Successfully');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }
}
