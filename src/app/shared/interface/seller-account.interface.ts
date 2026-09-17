import { PaginateModel } from "./core.interface";

export interface SellerAccountModel extends PaginateModel {
  data: SellerAccount[];
}

export interface SellerAccount {
  id: number;
  user_id: number;
  paypal_email: string | null;
  bank_name: string | null;
  bank_holder_name: string | null;
  bank_account_no: string | null;
  swift: string | null;
  ifsc: string | null;
  upi_id: string | null;
  bank_proof_id: number | null;
  is_default: number;
  status: number;
  created_at: string;
  updated_at: string;
  user: SellerAccountUser;
}

export interface SellerAccountUser {
  id: number;
  name: string;
  email: string;
  phone: number | string;
  status: number;
}
