export interface SellerKycFile {
    id: number;
    name: string;
    file_name: string;
    mime_type: string;
    asset_url: string;
    original_url: string;
}

export interface SellerKycStoreVendor {
    id: number;
    name: string;
    email: string;
    phone: number | string;
}

export interface SellerKycStore {
    id: number;
    store_name: string;
    slug: string;
    vendor_id: number;
    status: number;
    is_approved: number;
    vendor: SellerKycStoreVendor;
}

export interface SellerKycRecord {
    id: number;
    store_id: number;
    
    pan_number: string | null;
    pan_file_id: number | null;
    pan_status: number;
    pan_remark: string | null;
    pan_file: SellerKycFile | null;

    gstin: string | null;
    gst_file_id: number | null;
    gst_status: number;
    gst_remark: string | null;
    gst_file: SellerKycFile | null;

    business_reg_number: string | null;
    business_file_id: number | null;
    business_status: number;
    business_remark: string | null;
    business_file: SellerKycFile | null;

    address_file_id: number | null;
    address_status: number;
    address_remark: string | null;
    address_file: SellerKycFile | null;

    owner_id_number: string | null;
    owner_file_id: number | null;
    owner_status: number;
    owner_remark: string | null;
    owner_file: SellerKycFile | null;

    status: number;
    created_at: string;
    updated_at: string;

    store: SellerKycStore;
}

export interface SellerKycModel {
    data: SellerKycRecord[];
    current_page: number;
    per_page: number;
    last_page: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}
