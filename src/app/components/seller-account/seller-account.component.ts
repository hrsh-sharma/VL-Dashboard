import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Params } from '../../shared/interface/core.interface';
import { TableConfig } from '../../shared/interface/table.interface';
import { SellerAccountState } from '../../shared/state/seller-account.state';
import { GetSellerAccounts } from '../../shared/action/seller-account.action';

@Component({
  selector: 'app-seller-account',
  templateUrl: './seller-account.component.html',
  styleUrls: ['./seller-account.component.scss']
})
export class SellerAccountComponent {

  public tableConfig: TableConfig = {
    columns: [
      { title: "Vendor Name", dataField: "user.name", type: "text" },
      { title: "Vendor Email", dataField: "user.email", type: "text" },
      { title: "Bank Name", dataField: "bank_name", type: "text" },
      { title: "Account Holder", dataField: "bank_holder_name", type: "text" },
      { title: "Account No", dataField: "bank_account_no", type: "text" },
      { title: "IFSC Code", dataField: "ifsc", type: "text" },
      { title: "Status", dataField: "status", type: "switch" },
      { title: "Created At", dataField: "created_at", type: "date" }
    ],
    data: [] as any[],
    total: 0
  };

  constructor(private store: Store) {
    this.store.select(SellerAccountState.account).subscribe(account => {
      if (account) {
        this.tableConfig.data = account.data ? account.data : [];
        this.tableConfig.total = account.total ? account.total : 0;
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(new GetSellerAccounts({ page: 1, paginate: 15 }));
  }

  onTableChange(data: Params) {
    this.store.dispatch(new GetSellerAccounts(data));
  }

}
