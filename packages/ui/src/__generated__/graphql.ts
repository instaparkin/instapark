/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AadhaarVerifyResponse = {
  __typename?: 'AadhaarVerifyResponse';
  address?: Maybe<Scalars['String']['output']>;
  care_of?: Maybe<Scalars['String']['output']>;
  dob?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  mobile_hash?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  photo_link?: Maybe<Scalars['String']['output']>;
  ref_id?: Maybe<Scalars['String']['output']>;
  share_code?: Maybe<Scalars['String']['output']>;
  split_address?: Maybe<AadharVerifySplitAddress>;
  status?: Maybe<Scalars['String']['output']>;
  xml_file?: Maybe<Scalars['String']['output']>;
  year_of_birth?: Maybe<Scalars['Int']['output']>;
};

export type AadharOtpResponse = {
  __typename?: 'AadharOTPResponse';
  message?: Maybe<Scalars['String']['output']>;
  ref_id?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type AadharVerifySplitAddress = {
  __typename?: 'AadharVerifySplitAddress';
  country?: Maybe<Scalars['String']['output']>;
  dist?: Maybe<Scalars['String']['output']>;
  house?: Maybe<Scalars['String']['output']>;
  landmark?: Maybe<Scalars['String']['output']>;
  locality?: Maybe<Scalars['String']['output']>;
  pincode?: Maybe<Scalars['Int']['output']>;
  po?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  subdist?: Maybe<Scalars['String']['output']>;
  vtc?: Maybe<Scalars['String']['output']>;
};

export type Booking = {
  __typename?: 'Booking';
  basePrice?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['Int']['output']>;
  endDate?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  ipFee?: Maybe<Scalars['Float']['output']>;
  listingId?: Maybe<Scalars['String']['output']>;
  lockedAt?: Maybe<Scalars['Int']['output']>;
  otp?: Maybe<BookingOtp>;
  parkingPrice?: Maybe<Scalars['Float']['output']>;
  payments?: Maybe<Array<Maybe<Payment>>>;
  penalty?: Maybe<Scalars['Float']['output']>;
  startDate?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<BookingStatus>;
  totalPrice?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<Profile>;
  userId?: Maybe<Scalars['String']['output']>;
  vehicle?: Maybe<Vehicle>;
};

export type BookingMutation = {
  __typename?: 'BookingMutation';
  book?: Maybe<Scalars['String']['output']>;
  complete?: Maybe<Scalars['String']['output']>;
  completeOrder?: Maybe<CompleteOrderResponse>;
  lock?: Maybe<LockResponse>;
  verifyOTP?: Maybe<Scalars['String']['output']>;
};


export type BookingMutationBookArgs = {
  bookingId?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type BookingMutationCompleteArgs = {
  bookingId?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type BookingMutationCompleteOrderArgs = {
  basePrice: Scalars['Float']['input'];
  customer: CompleteOrderCustomer;
  id: Scalars['String']['input'];
  ipFee: Scalars['Float']['input'];
  listingId: Scalars['String']['input'];
  parkingPrice: Scalars['Float']['input'];
  totalPrice: Scalars['Float']['input'];
  userId: Scalars['String']['input'];
  vendor_id: Scalars['String']['input'];
};


export type BookingMutationLockArgs = {
  basePrice: Scalars['Float']['input'];
  customer: LockCustomer;
  endDate: Scalars['Int']['input'];
  ipFee: Scalars['Float']['input'];
  listingId: Scalars['String']['input'];
  parkingPrice: Scalars['Float']['input'];
  startDate: Scalars['Int']['input'];
  totalPrice: Scalars['Float']['input'];
  userId: Scalars['String']['input'];
  vehicle: Vehicle;
  vendor_id: Scalars['String']['input'];
};


export type BookingMutationVerifyOtpArgs = {
  bookingId: Scalars['String']['input'];
  otp: Scalars['Int']['input'];
};

export type BookingOtp = {
  __typename?: 'BookingOTP';
  bookingId?: Maybe<Scalars['String']['output']>;
  expiresAt?: Maybe<Scalars['Int']['output']>;
  otp?: Maybe<Scalars['Int']['output']>;
};

export type BookingOrderSplit = {
  __typename?: 'BookingOrderSplit';
  amount?: Maybe<Scalars['Float']['output']>;
  percentage?: Maybe<Scalars['Int']['output']>;
  tags?: Maybe<Scalars['String']['output']>;
  vendor_id?: Maybe<Scalars['String']['output']>;
};

export type BookingQuery = {
  __typename?: 'BookingQuery';
  buyerBookings?: Maybe<Array<Maybe<BookingsBuyer>>>;
};


export type BookingQueryBuyerBookingsArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<BookingStatus>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export enum BookingStatus {
  Booked = 'Booked',
  Completed = 'Completed',
  Locked = 'Locked',
  OnGoing = 'OnGoing'
}

export type BookingsBuyer = {
  __typename?: 'BookingsBuyer';
  booking?: Maybe<Booking>;
  listing?: Maybe<Listing>;
};

export type CompleteOrderCustomer = {
  customer_email?: InputMaybe<Scalars['String']['input']>;
  customer_name?: InputMaybe<Scalars['String']['input']>;
  customer_phone?: InputMaybe<Scalars['String']['input']>;
};

export type CompleteOrderResponse = {
  __typename?: 'CompleteOrderResponse';
  bookingId?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  orderId?: Maybe<Scalars['String']['output']>;
  payment_session_id?: Maybe<Scalars['String']['output']>;
};

export type CurrentMonth = {
  __typename?: 'CurrentMonth';
  avgBookingValue?: Maybe<Scalars['Float']['output']>;
  totalBookings?: Maybe<Scalars['Int']['output']>;
  totalNetProfit?: Maybe<Scalars['Float']['output']>;
  totalRevenue?: Maybe<Scalars['Float']['output']>;
};

export type CustomerDetails = {
  __typename?: 'CustomerDetails';
  customer_email?: Maybe<Scalars['String']['output']>;
  customer_id?: Maybe<Scalars['String']['output']>;
  customer_name?: Maybe<Scalars['String']['output']>;
  customer_phone?: Maybe<Scalars['String']['output']>;
  customer_uid?: Maybe<Scalars['String']['output']>;
};

export type Earnings = {
  __typename?: 'Earnings';
  currentMonth?: Maybe<CurrentMonth>;
  netPL?: Maybe<NetPl>;
  previousMonth?: Maybe<PreviousMonth>;
};

export type EarningsDashboard = {
  __typename?: 'EarningsDashboard';
  earnings?: Maybe<Earnings>;
  listings?: Maybe<Array<Maybe<Listing>>>;
  vendorBalance?: Maybe<VendorBalance>;
};


export type EarningsDashboardVendorBalanceArgs = {
  vendorId: Scalars['String']['input'];
};

export enum EntityType {
  Transaction = 'TRANSACTION',
  VendorCommision = 'VENDOR_COMMISION'
}

export type HostBooking = {
  __typename?: 'HostBooking';
  booking?: Maybe<Booking>;
  listing?: Maybe<Listing>;
};

export type HostBookings = {
  __typename?: 'HostBookings';
  bookings?: Maybe<Array<Maybe<HostBooking>>>;
  listings?: Maybe<Array<Maybe<Listing>>>;
};


export type HostBookingsBookingsArgs = {
  status: BookingStatus;
};

export type KycInput = {
  uidai?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Listing = {
  __typename?: 'Listing';
  allowedVehicles: Array<Vehicle>;
  basePrice: Scalars['Float']['output'];
  calulator?: Maybe<PricingCalulator>;
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['Int']['output'];
  district: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isOpen: Scalars['Boolean']['output'];
  landmark: Scalars['String']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  photos: Array<Scalars['String']['output']>;
  pincode: Scalars['Int']['output'];
  plph: Scalars['Float']['output'];
  pphbi?: Maybe<Scalars['Float']['output']>;
  pphcr?: Maybe<Scalars['Float']['output']>;
  pphcy?: Maybe<Scalars['Float']['output']>;
  state: Scalars['String']['output'];
  street: Scalars['String']['output'];
  type: PlaceType;
  updatedAt: Scalars['Int']['output'];
  user?: Maybe<Profile>;
  userId: Scalars['String']['output'];
};


export type ListingCalulatorArgs = {
  endDate?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['Int']['input']>;
  vehicle?: InputMaybe<Vehicle>;
};

export type ListingMutation = {
  __typename?: 'ListingMutation';
  createListing?: Maybe<Scalars['String']['output']>;
  updateListing?: Maybe<Scalars['String']['output']>;
};


export type ListingMutationCreateListingArgs = {
  allowedVehicles: Array<Vehicle>;
  basePrice: Scalars['Float']['input'];
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  district: Scalars['String']['input'];
  landmark?: InputMaybe<Scalars['String']['input']>;
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  photos: Array<Scalars['String']['input']>;
  pincode: Scalars['Int']['input'];
  plph: Scalars['Float']['input'];
  pphbi?: InputMaybe<Scalars['Float']['input']>;
  pphcr?: InputMaybe<Scalars['Float']['input']>;
  pphcy?: InputMaybe<Scalars['Float']['input']>;
  state: Scalars['String']['input'];
  street: Scalars['String']['input'];
  type: PlaceType;
  userId: Scalars['String']['input'];
};


export type ListingMutationUpdateListingArgs = {
  allowedVehicles?: InputMaybe<Array<InputMaybe<Vehicle>>>;
  basePrice?: InputMaybe<Scalars['Float']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  district?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  landmark?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  photos?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pincode?: InputMaybe<Scalars['Int']['input']>;
  plph?: InputMaybe<Scalars['Float']['input']>;
  pphbi?: InputMaybe<Scalars['Float']['input']>;
  pphcr?: InputMaybe<Scalars['Float']['input']>;
  pphcy?: InputMaybe<Scalars['Float']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<PlaceType>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type ListingQuery = {
  __typename?: 'ListingQuery';
  hostBookings?: Maybe<HostBookings>;
  hostListings?: Maybe<Array<Maybe<Listing>>>;
  searchListings?: Maybe<Array<Maybe<Listing>>>;
};


export type ListingQueryHostBookingsArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type ListingQueryHostListingsArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type ListingQuerySearchListingsArgs = {
  endDate?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['Int']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  vehicleType?: InputMaybe<Vehicle>;
};

export type LockCustomer = {
  customer_email?: InputMaybe<Scalars['String']['input']>;
  customer_name?: InputMaybe<Scalars['String']['input']>;
  customer_phone?: InputMaybe<Scalars['String']['input']>;
};

export type LockResponse = {
  __typename?: 'LockResponse';
  bookingId?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  orderId?: Maybe<Scalars['String']['output']>;
  payment_session_id?: Maybe<Scalars['String']['output']>;
};

export type NetPl = {
  __typename?: 'NetPL';
  avgBookingValuePLPercent?: Maybe<Scalars['Float']['output']>;
  totalBookingsPLPercent?: Maybe<Scalars['Float']['output']>;
  totalNetProfitPLPercent?: Maybe<Scalars['Float']['output']>;
  totalRevenuePLPercent?: Maybe<Scalars['Float']['output']>;
};

export type Order = {
  __typename?: 'Order';
  cart_details?: Maybe<Scalars['String']['output']>;
  cf_order_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['String']['output']>;
  customer_details?: Maybe<CustomerDetails>;
  entity?: Maybe<Scalars['String']['output']>;
  order_amount?: Maybe<Scalars['Float']['output']>;
  order_currency?: Maybe<Scalars['String']['output']>;
  order_expiry_time?: Maybe<Scalars['String']['output']>;
  order_id?: Maybe<Scalars['String']['output']>;
  order_meta?: Maybe<OrderMeta>;
  order_note?: Maybe<Scalars['String']['output']>;
  order_splits?: Maybe<Array<Maybe<BookingOrderSplit>>>;
  order_status?: Maybe<Scalars['String']['output']>;
  order_tags?: Maybe<Scalars['String']['output']>;
  payment_session_id?: Maybe<Scalars['String']['output']>;
  terminal_data?: Maybe<Scalars['String']['output']>;
};

export type OrderMeta = {
  __typename?: 'OrderMeta';
  notify_url?: Maybe<Scalars['String']['output']>;
  payment_methods?: Maybe<Scalars['String']['output']>;
  return_url?: Maybe<Scalars['String']['output']>;
};

export type Payment = {
  __typename?: 'Payment';
  bookingId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Int']['output']>;
  order?: Maybe<Order>;
  orderId?: Maybe<Scalars['String']['output']>;
  paymentType?: Maybe<PaymentType>;
  reconData?: Maybe<Array<Maybe<ReconData>>>;
  updatedAt?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};


export type PaymentReconDataArgs = {
  entity_type: EntityType;
  limit: Scalars['Int']['input'];
};

export enum PaymentType {
  Booking = 'Booking',
  Completed = 'Completed'
}

export enum PlaceType {
  Barn = 'Barn',
  Cabin = 'Cabin',
  Castle = 'Castle',
  Farm = 'Farm',
  Hotel = 'Hotel',
  House = 'House'
}

export type PreviousMonth = {
  __typename?: 'PreviousMonth';
  avgBookingValue?: Maybe<Scalars['Float']['output']>;
  totalBookings?: Maybe<Scalars['Int']['output']>;
  totalNetProfit?: Maybe<Scalars['Float']['output']>;
  totalRevenue?: Maybe<Scalars['Float']['output']>;
};

export type PricingCalulator = {
  __typename?: 'PricingCalulator';
  hourly: Scalars['Float']['output'];
  items: Array<Maybe<PricingItems>>;
  vehicles: Array<Vehicle>;
};

export type PricingItems = {
  __typename?: 'PricingItems';
  field?: Maybe<Scalars['String']['output']>;
  separator?: Maybe<Scalars['Boolean']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type Profile = {
  __typename?: 'Profile';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  district?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  kyc?: Maybe<Kyc>;
  landmark?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  pincode?: Maybe<Scalars['Int']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  timeJoined?: Maybe<Scalars['Int']['output']>;
  userId: Scalars['String']['output'];
};

export type ReconData = {
  __typename?: 'ReconData';
  added_on?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  customer_email?: Maybe<Scalars['String']['output']>;
  customer_phone?: Maybe<Scalars['String']['output']>;
  eligible_split_balance?: Maybe<Scalars['String']['output']>;
  entity_id?: Maybe<Scalars['String']['output']>;
  entity_type?: Maybe<Scalars['String']['output']>;
  merchant_order_id?: Maybe<Scalars['String']['output']>;
  merchant_settlement_id?: Maybe<Scalars['String']['output']>;
  merchant_settlement_utr?: Maybe<Scalars['String']['output']>;
  merchant_vendor_commission?: Maybe<Scalars['String']['output']>;
  merchant_vendor_id?: Maybe<Scalars['String']['output']>;
  order_splits?: Maybe<Array<Maybe<VendorOrderSplit>>>;
  payment_utr?: Maybe<Scalars['String']['output']>;
  pg_charge_postpaid?: Maybe<Scalars['String']['output']>;
  pg_service_charge?: Maybe<Scalars['String']['output']>;
  pg_service_tax?: Maybe<Scalars['String']['output']>;
  sale_type?: Maybe<Scalars['String']['output']>;
  settled?: Maybe<Scalars['String']['output']>;
  settlement_eligibility_time?: Maybe<Scalars['String']['output']>;
  settlement_initiated_on?: Maybe<Scalars['String']['output']>;
  settlement_time?: Maybe<Scalars['String']['output']>;
  split_service_charge?: Maybe<Scalars['String']['output']>;
  split_service_tax?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Scalars['String']['output']>;
  tx_time?: Maybe<Scalars['String']['output']>;
  vendor_commission?: Maybe<Scalars['String']['output']>;
  vendor_pg_service_charge?: Maybe<Scalars['String']['output']>;
  vendor_pg_service_tax?: Maybe<Scalars['String']['output']>;
  vendor_settlement_eligibility_time?: Maybe<Scalars['String']['output']>;
  vendor_settlement_id?: Maybe<Scalars['String']['output']>;
  vendor_settlement_initiated_on?: Maybe<Scalars['String']['output']>;
  vendor_settlement_time?: Maybe<Scalars['String']['output']>;
};

export type RootMutation = {
  __typename?: 'RootMutation';
  BookingMutation?: Maybe<BookingMutation>;
  ListingMutation?: Maybe<ListingMutation>;
  UserMutation?: Maybe<UserMutation>;
  VendorMutation?: Maybe<VendorMutation>;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  BookingQuery?: Maybe<BookingQuery>;
  ListingQuery?: Maybe<ListingQuery>;
  UserQuery?: Maybe<UserQuery>;
  VendorQuery?: Maybe<VendorQuery>;
};

export type UserMutation = {
  __typename?: 'UserMutation';
  aadharOTP?: Maybe<AadharOtpResponse>;
  aadharVerify?: Maybe<AadhaarVerifyResponse>;
  upsertProfile?: Maybe<Scalars['String']['output']>;
};


export type UserMutationAadharOtpArgs = {
  uidai: Scalars['String']['input'];
};


export type UserMutationAadharVerifyArgs = {
  otp: Scalars['String']['input'];
  ref_id: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type UserMutationUpsertProfileArgs = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  district?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  kyc?: InputMaybe<KycInput>;
  landmark?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  pincode?: InputMaybe<Scalars['Int']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  timeJoined?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['String']['input'];
};

export type UserQuery = {
  __typename?: 'UserQuery';
  getProfile?: Maybe<Profile>;
};


export type UserQueryGetProfileArgs = {
  userId: Scalars['String']['input'];
};

export enum Vehicle {
  Bike = 'Bike',
  Car = 'Car',
  Cycle = 'Cycle'
}

export type Vendor = {
  __typename?: 'Vendor';
  bank?: Maybe<VendorBank>;
  dashboard_access?: Maybe<Scalars['Boolean']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  kyc_details?: Maybe<VendorKyc>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  related_docs?: Maybe<Array<Maybe<VendorDocuments>>>;
  schedule_option?: Maybe<VendorSchedule>;
  status?: Maybe<Scalars['String']['output']>;
  vendor_id?: Maybe<Scalars['String']['output']>;
  verify_account?: Maybe<Scalars['Boolean']['output']>;
};

export type VendorBalance = {
  __typename?: 'VendorBalance';
  vendor_id: Scalars['String']['output'];
  vendor_unsettled: Scalars['String']['output'];
};

export type VendorBank = {
  __typename?: 'VendorBank';
  account_holder?: Maybe<Scalars['String']['output']>;
  account_number?: Maybe<Scalars['String']['output']>;
  ifsc?: Maybe<Scalars['String']['output']>;
};

export type VendorBankInput = {
  account_holder?: InputMaybe<Scalars['String']['input']>;
  account_number?: InputMaybe<Scalars['String']['input']>;
  ifsc?: InputMaybe<Scalars['String']['input']>;
};

export type VendorDocuments = {
  __typename?: 'VendorDocuments';
  doc_name?: Maybe<Scalars['String']['output']>;
  doc_value?: Maybe<Scalars['String']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type VendorKyc = {
  __typename?: 'VendorKYC';
  account_type?: Maybe<Scalars['String']['output']>;
  business_type?: Maybe<Scalars['String']['output']>;
  pan?: Maybe<Scalars['String']['output']>;
};

export type VendorKycInput = {
  pan?: InputMaybe<Scalars['String']['input']>;
};

export type VendorMutation = {
  __typename?: 'VendorMutation';
  createVendor?: Maybe<Scalars['String']['output']>;
};


export type VendorMutationCreateVendorArgs = {
  bank?: InputMaybe<VendorBankInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  kyc_details?: InputMaybe<VendorKycInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  vendor_id?: InputMaybe<Scalars['String']['input']>;
};

export type VendorOrderSplit = {
  __typename?: 'VendorOrderSplit';
  split?: Maybe<Array<Maybe<VendorSplit>>>;
};

export type VendorQuery = {
  __typename?: 'VendorQuery';
  getEarningsDashboard?: Maybe<EarningsDashboard>;
  getVendor?: Maybe<Vendor>;
};


export type VendorQueryGetEarningsDashboardArgs = {
  userId: Scalars['String']['input'];
};


export type VendorQueryGetVendorArgs = {
  vendorId: Scalars['String']['input'];
};

export type VendorSchedule = {
  __typename?: 'VendorSchedule';
  merchant_default?: Maybe<Scalars['Boolean']['output']>;
  schedule_id?: Maybe<Scalars['Int']['output']>;
  settlement_schedule_message?: Maybe<Scalars['String']['output']>;
};

export type VendorSplit = {
  __typename?: 'VendorSplit';
  merchant_vendor_id?: Maybe<Scalars['String']['output']>;
  percentage?: Maybe<Scalars['Int']['output']>;
  tags?: Maybe<Scalars['String']['output']>;
};

export type Kyc = {
  __typename?: 'kyc';
  uidai?: Maybe<Scalars['String']['output']>;
  verified?: Maybe<Scalars['Boolean']['output']>;
};

export type Aadhar_OtpMutationVariables = Exact<{
  uidai: Scalars['String']['input'];
}>;


export type Aadhar_OtpMutation = { __typename?: 'RootMutation', UserMutation?: { __typename?: 'UserMutation', aadharOTP?: { __typename?: 'AadharOTPResponse', status?: string | null, message?: string | null, ref_id?: number | null } | null } | null };

export type Aadhar_VerifyMutationVariables = Exact<{
  otp: Scalars['String']['input'];
  refId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type Aadhar_VerifyMutation = { __typename?: 'RootMutation', UserMutation?: { __typename?: 'UserMutation', aadharVerify?: { __typename?: 'AadhaarVerifyResponse', ref_id?: string | null, status?: string | null, message?: string | null, care_of?: string | null, address?: string | null, dob?: string | null, email?: string | null, gender?: string | null, name?: string | null, year_of_birth?: number | null, mobile_hash?: string | null, photo_link?: string | null, share_code?: string | null, xml_file?: string | null, split_address?: { __typename?: 'AadharVerifySplitAddress', country?: string | null, dist?: string | null, house?: string | null, landmark?: string | null, pincode?: number | null, po?: string | null, state?: string | null, street?: string | null, subdist?: string | null, vtc?: string | null, locality?: string | null } | null } | null } | null };

export type Complete_OrderMutationVariables = Exact<{
  bookingId: Scalars['String']['input'];
  listingId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
  basePrice: Scalars['Float']['input'];
  parkingPrice: Scalars['Float']['input'];
  totalPrice: Scalars['Float']['input'];
  ipFee: Scalars['Float']['input'];
  customer: CompleteOrderCustomer;
  vendorId: Scalars['String']['input'];
}>;


export type Complete_OrderMutation = { __typename?: 'RootMutation', BookingMutation?: { __typename?: 'BookingMutation', completeOrder?: { __typename?: 'CompleteOrderResponse', bookingId?: string | null, orderId?: string | null, payment_session_id?: string | null, message?: string | null } | null } | null };

export type CompleteMutationVariables = Exact<{
  bookingId?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type CompleteMutation = { __typename?: 'RootMutation', BookingMutation?: { __typename?: 'BookingMutation', complete?: string | null } | null };

export type Create_BookMutationVariables = Exact<{
  bookingId?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type Create_BookMutation = { __typename?: 'RootMutation', BookingMutation?: { __typename?: 'BookingMutation', book?: string | null } | null };

export type CreateListingMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  type: PlaceType;
  country: Scalars['String']['input'];
  state: Scalars['String']['input'];
  district: Scalars['String']['input'];
  city: Scalars['String']['input'];
  street: Scalars['String']['input'];
  pincode: Scalars['Int']['input'];
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  allowedVehicles: Array<Vehicle> | Vehicle;
  basePrice: Scalars['Float']['input'];
  pphbi?: InputMaybe<Scalars['Float']['input']>;
  pphcy?: InputMaybe<Scalars['Float']['input']>;
  pphcr?: InputMaybe<Scalars['Float']['input']>;
  plph: Scalars['Float']['input'];
  photos: Array<Scalars['String']['input']> | Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  landmark?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateListingMutation = { __typename?: 'RootMutation', ListingMutation?: { __typename?: 'ListingMutation', createListing?: string | null } | null };

export type LockMutationVariables = Exact<{
  listingId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
  startDate: Scalars['Int']['input'];
  endDate: Scalars['Int']['input'];
  basePrice: Scalars['Float']['input'];
  parkingPrice: Scalars['Float']['input'];
  totalPrice: Scalars['Float']['input'];
  vehicle: Vehicle;
  ipFee: Scalars['Float']['input'];
  customer: LockCustomer;
  vendorId: Scalars['String']['input'];
}>;


export type LockMutation = { __typename?: 'RootMutation', BookingMutation?: { __typename?: 'BookingMutation', lock?: { __typename?: 'LockResponse', bookingId?: string | null, orderId?: string | null, payment_session_id?: string | null, message?: string | null } | null } | null };

export type CreateVendorMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  bank?: InputMaybe<VendorBankInput>;
  kyc_details?: InputMaybe<VendorKycInput>;
  vendor_id?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateVendorMutation = { __typename?: 'RootMutation', VendorMutation?: { __typename?: 'VendorMutation', createVendor?: string | null } | null };

export type GetEarningsDashboardQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  vendorId: Scalars['String']['input'];
}>;


export type GetEarningsDashboardQuery = { __typename?: 'RootQuery', VendorQuery?: { __typename?: 'VendorQuery', getEarningsDashboard?: { __typename?: 'EarningsDashboard', earnings?: { __typename?: 'Earnings', currentMonth?: { __typename?: 'CurrentMonth', totalBookings?: number | null, totalRevenue?: number | null, totalNetProfit?: number | null, avgBookingValue?: number | null } | null, previousMonth?: { __typename?: 'PreviousMonth', totalBookings?: number | null, totalRevenue?: number | null, totalNetProfit?: number | null, avgBookingValue?: number | null } | null, netPL?: { __typename?: 'NetPL', totalBookingsPLPercent?: number | null, totalRevenuePLPercent?: number | null, totalNetProfitPLPercent?: number | null, avgBookingValuePLPercent?: number | null } | null } | null, vendorBalance?: { __typename?: 'VendorBalance', vendor_id: string, vendor_unsettled: string } | null } | null } | null };

export type Get_ProfileQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type Get_ProfileQuery = { __typename?: 'RootQuery', UserQuery?: { __typename?: 'UserQuery', getProfile?: { __typename?: 'Profile', userId: string, firstName: string, lastName: string, email?: string | null, timeJoined?: number | null, phoneNumber?: string | null, country?: string | null, state?: string | null, district?: string | null, city?: string | null, street?: string | null, pincode?: number | null, name?: string | null, landmark?: string | null, kyc?: { __typename?: 'kyc', uidai?: string | null, verified?: boolean | null } | null } | null } | null };

export type Get_Recon_DataQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  entityType: EntityType;
}>;


export type Get_Recon_DataQuery = { __typename?: 'RootQuery', BookingQuery?: { __typename?: 'BookingQuery', buyerBookings?: Array<{ __typename?: 'BookingsBuyer', booking?: { __typename?: 'Booking', payments?: Array<{ __typename?: 'Payment', reconData?: Array<{ __typename?: 'ReconData', amount?: number | null, merchant_order_id?: string | null, tx_time?: string | null, settled?: string | null, entity_id?: string | null, currency?: string | null, sale_type?: string | null, customer_email?: string | null, customer_phone?: string | null, added_on?: string | null, entity_type?: string | null, settlement_eligibility_time?: string | null, merchant_settlement_utr?: string | null, payment_utr?: string | null, merchant_vendor_commission?: string | null, split_service_charge?: string | null, split_service_tax?: string | null, pg_service_tax?: string | null, pg_service_charge?: string | null, pg_charge_postpaid?: string | null, merchant_settlement_id?: string | null, tags?: string | null, settlement_initiated_on?: string | null, settlement_time?: string | null, eligible_split_balance?: string | null, merchant_vendor_id?: string | null, vendor_settlement_time?: string | null, vendor_settlement_initiated_on?: string | null, vendor_settlement_eligibility_time?: string | null, vendor_settlement_id?: string | null, vendor_commission?: string | null, vendor_pg_service_charge?: string | null, vendor_pg_service_tax?: string | null, status?: string | null, order_splits?: Array<{ __typename?: 'VendorOrderSplit', split?: Array<{ __typename?: 'VendorSplit', merchant_vendor_id?: string | null, percentage?: number | null, tags?: string | null } | null> | null } | null> | null } | null> | null } | null> | null } | null } | null> | null } | null };

export type Get_Trip_DetailedQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  id: Scalars['String']['input'];
}>;


export type Get_Trip_DetailedQuery = { __typename?: 'RootQuery', BookingQuery?: { __typename?: 'BookingQuery', buyerBookings?: Array<{ __typename?: 'BookingsBuyer', booking?: { __typename?: 'Booking', id?: string | null, listingId?: string | null, userId?: string | null, startDate?: number | null, endDate?: number | null, status?: BookingStatus | null, lockedAt?: number | null, basePrice?: number | null, parkingPrice?: number | null, totalPrice?: number | null, ipFee?: number | null, penalty?: number | null, createdAt?: number | null, updatedAt?: number | null, payments?: Array<{ __typename?: 'Payment', bookingId?: string | null, userId?: string | null, orderId?: string | null, paymentType?: PaymentType | null, createdAt?: number | null, updatedAt?: number | null, order?: { __typename?: 'Order', cart_details?: string | null, cf_order_id?: string | null, created_at?: string | null, entity?: string | null, order_amount?: number | null, order_currency?: string | null, order_expiry_time?: string | null, order_id?: string | null, order_note?: string | null, order_status?: string | null, order_tags?: string | null, payment_session_id?: string | null, terminal_data?: string | null, customer_details?: { __typename?: 'CustomerDetails', customer_id?: string | null, customer_name?: string | null, customer_email?: string | null, customer_phone?: string | null, customer_uid?: string | null } | null, order_meta?: { __typename?: 'OrderMeta', return_url?: string | null, notify_url?: string | null, payment_methods?: string | null } | null, order_splits?: Array<{ __typename?: 'BookingOrderSplit', vendor_id?: string | null, amount?: number | null, percentage?: number | null, tags?: string | null } | null> | null } | null } | null> | null, otp?: { __typename?: 'BookingOTP', bookingId?: string | null, otp?: number | null, expiresAt?: number | null } | null } | null, listing?: { __typename?: 'Listing', userId: string, type: PlaceType, country: string, state: string, district: string, city: string, street: string, pincode: number, latitude: number, longitude: number, name: string, landmark: string, allowedVehicles: Array<Vehicle>, basePrice: number, pphbi?: number | null, pphcy?: number | null, pphcr?: number | null, plph: number, photos: Array<string>, id: string, createdAt: number, updatedAt: number, user?: { __typename?: 'Profile', firstName: string, lastName: string, timeJoined?: number | null } | null } | null } | null> | null } | null };

export type Get_TripsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<BookingStatus>;
  id?: InputMaybe<Scalars['String']['input']>;
}>;


export type Get_TripsQuery = { __typename?: 'RootQuery', BookingQuery?: { __typename?: 'BookingQuery', buyerBookings?: Array<{ __typename?: 'BookingsBuyer', booking?: { __typename?: 'Booking', id?: string | null, listingId?: string | null, userId?: string | null, startDate?: number | null, endDate?: number | null, status?: BookingStatus | null, lockedAt?: number | null, basePrice?: number | null, parkingPrice?: number | null, totalPrice?: number | null, ipFee?: number | null, penalty?: number | null, createdAt?: number | null, updatedAt?: number | null, payments?: Array<{ __typename?: 'Payment', bookingId?: string | null, userId?: string | null, orderId?: string | null, paymentType?: PaymentType | null, createdAt?: number | null, updatedAt?: number | null, order?: { __typename?: 'Order', cart_details?: string | null, cf_order_id?: string | null, created_at?: string | null, entity?: string | null, order_amount?: number | null, order_currency?: string | null, order_expiry_time?: string | null, order_id?: string | null, order_note?: string | null, order_status?: string | null, order_tags?: string | null, payment_session_id?: string | null, terminal_data?: string | null, customer_details?: { __typename?: 'CustomerDetails', customer_id?: string | null, customer_name?: string | null, customer_email?: string | null, customer_phone?: string | null, customer_uid?: string | null } | null, order_meta?: { __typename?: 'OrderMeta', return_url?: string | null, notify_url?: string | null, payment_methods?: string | null } | null, order_splits?: Array<{ __typename?: 'BookingOrderSplit', vendor_id?: string | null, amount?: number | null, percentage?: number | null, tags?: string | null } | null> | null } | null } | null> | null, otp?: { __typename?: 'BookingOTP', bookingId?: string | null, otp?: number | null, expiresAt?: number | null } | null } | null, listing?: { __typename?: 'Listing', userId: string, type: PlaceType, country: string, state: string, district: string, city: string, street: string, pincode: number, latitude: number, longitude: number, name: string, landmark: string, allowedVehicles: Array<Vehicle>, basePrice: number, pphbi?: number | null, pphcy?: number | null, pphcr?: number | null, plph: number, photos: Array<string>, id: string, isOpen: boolean, createdAt: number, updatedAt: number, user?: { __typename?: 'Profile', userId: string, firstName: string, lastName: string, email?: string | null, timeJoined?: number | null, phoneNumber?: string | null, country?: string | null, state?: string | null, district?: string | null, city?: string | null, street?: string | null, pincode?: number | null, name?: string | null, landmark?: string | null, kyc?: { __typename?: 'kyc', uidai?: string | null, verified?: boolean | null } | null } | null } | null } | null> | null } | null };

export type GetVendorQueryVariables = Exact<{
  vendorId: Scalars['String']['input'];
}>;


export type GetVendorQuery = { __typename?: 'RootQuery', VendorQuery?: { __typename?: 'VendorQuery', getVendor?: { __typename?: 'Vendor', name?: string | null, email?: string | null, phone?: string | null, vendor_id?: string | null, status?: string | null, verify_account?: boolean | null, dashboard_access?: boolean | null, bank?: { __typename?: 'VendorBank', account_number?: string | null, account_holder?: string | null, ifsc?: string | null } | null, kyc_details?: { __typename?: 'VendorKYC', account_type?: string | null, business_type?: string | null, pan?: string | null } | null, schedule_option?: { __typename?: 'VendorSchedule', settlement_schedule_message?: string | null, schedule_id?: number | null, merchant_default?: boolean | null } | null, related_docs?: Array<{ __typename?: 'VendorDocuments', doc_name?: string | null, doc_value?: string | null, status?: string | null, remarks?: string | null } | null> | null } | null } | null };

export type HostBookingsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
  status: BookingStatus;
}>;


export type HostBookingsQuery = { __typename?: 'RootQuery', ListingQuery?: { __typename?: 'ListingQuery', hostBookings?: { __typename?: 'HostBookings', bookings?: Array<{ __typename?: 'HostBooking', booking?: { __typename?: 'Booking', id?: string | null, listingId?: string | null, userId?: string | null, startDate?: number | null, endDate?: number | null, status?: BookingStatus | null, lockedAt?: number | null, basePrice?: number | null, parkingPrice?: number | null, totalPrice?: number | null, ipFee?: number | null, penalty?: number | null, vehicle?: Vehicle | null, createdAt?: number | null, updatedAt?: number | null, user?: { __typename?: 'Profile', userId: string, firstName: string, lastName: string, email?: string | null, timeJoined?: number | null, phoneNumber?: string | null, country?: string | null, state?: string | null, district?: string | null, city?: string | null, street?: string | null, pincode?: number | null, name?: string | null, landmark?: string | null, kyc?: { __typename?: 'kyc', uidai?: string | null, verified?: boolean | null } | null } | null, payments?: Array<{ __typename?: 'Payment', bookingId?: string | null, userId?: string | null, orderId?: string | null, paymentType?: PaymentType | null, createdAt?: number | null, updatedAt?: number | null, order?: { __typename?: 'Order', cart_details?: string | null, cf_order_id?: string | null, created_at?: string | null, entity?: string | null, order_amount?: number | null, order_currency?: string | null, order_expiry_time?: string | null, order_id?: string | null, order_note?: string | null, order_status?: string | null, order_tags?: string | null, payment_session_id?: string | null, terminal_data?: string | null, customer_details?: { __typename?: 'CustomerDetails', customer_id?: string | null, customer_name?: string | null, customer_email?: string | null, customer_phone?: string | null, customer_uid?: string | null } | null, order_meta?: { __typename?: 'OrderMeta', return_url?: string | null, notify_url?: string | null, payment_methods?: string | null } | null, order_splits?: Array<{ __typename?: 'BookingOrderSplit', vendor_id?: string | null, amount?: number | null, percentage?: number | null, tags?: string | null } | null> | null } | null } | null> | null, otp?: { __typename?: 'BookingOTP', bookingId?: string | null, otp?: number | null, expiresAt?: number | null } | null } | null, listing?: { __typename?: 'Listing', userId: string, type: PlaceType, country: string, state: string, district: string, city: string, street: string, pincode: number, latitude: number, longitude: number, name: string, landmark: string, allowedVehicles: Array<Vehicle>, basePrice: number, pphbi?: number | null, pphcy?: number | null, pphcr?: number | null, plph: number, photos: Array<string>, id: string, isOpen: boolean, createdAt: number, updatedAt: number, user?: { __typename?: 'Profile', userId: string, firstName: string, lastName: string, email?: string | null, timeJoined?: number | null, phoneNumber?: string | null, country?: string | null, state?: string | null, district?: string | null, city?: string | null, street?: string | null, pincode?: number | null, name?: string | null, landmark?: string | null, kyc?: { __typename?: 'kyc', uidai?: string | null, verified?: boolean | null } | null } | null } | null } | null> | null } | null } | null };

export type Host_ListingsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
}>;


export type Host_ListingsQuery = { __typename?: 'RootQuery', ListingQuery?: { __typename?: 'ListingQuery', hostListings?: Array<{ __typename?: 'Listing', userId: string, type: PlaceType, country: string, state: string, district: string, city: string, street: string, pincode: number, latitude: number, longitude: number, name: string, landmark: string, allowedVehicles: Array<Vehicle>, basePrice: number, pphbi?: number | null, pphcy?: number | null, pphcr?: number | null, plph: number, photos: Array<string>, id: string, isOpen: boolean, createdAt: number, updatedAt: number, user?: { __typename?: 'Profile', userId: string, firstName: string, lastName: string, email?: string | null, timeJoined?: number | null, phoneNumber?: string | null, country?: string | null, state?: string | null, district?: string | null, city?: string | null, street?: string | null, pincode?: number | null, name?: string | null, landmark?: string | null, kyc?: { __typename?: 'kyc', uidai?: string | null, verified?: boolean | null } | null } | null } | null> | null } | null };

export type Pricing_CalculatorQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['Int']['input']>;
  endDate?: InputMaybe<Scalars['Int']['input']>;
  vehicle?: InputMaybe<Vehicle>;
}>;


export type Pricing_CalculatorQuery = { __typename?: 'RootQuery', ListingQuery?: { __typename?: 'ListingQuery', hostListings?: Array<{ __typename?: 'Listing', calulator?: { __typename?: 'PricingCalulator', vehicles: Array<Vehicle>, hourly: number, items: Array<{ __typename?: 'PricingItems', field?: string | null, value?: string | null, separator?: boolean | null } | null> } | null } | null> | null } | null };

export type SearchListingsQueryVariables = Exact<{
  street?: InputMaybe<Scalars['String']['input']>;
  vehicleType?: InputMaybe<Vehicle>;
  startDate?: InputMaybe<Scalars['Int']['input']>;
  endDate?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SearchListingsQuery = { __typename?: 'RootQuery', ListingQuery?: { __typename?: 'ListingQuery', searchListings?: Array<{ __typename?: 'Listing', userId: string, type: PlaceType, country: string, state: string, district: string, city: string, street: string, pincode: number, latitude: number, longitude: number, name: string, landmark: string, allowedVehicles: Array<Vehicle>, basePrice: number, pphbi?: number | null, pphcy?: number | null, pphcr?: number | null, plph: number, photos: Array<string>, id: string, isOpen: boolean, createdAt: number, updatedAt: number } | null> | null } | null };

export type Update_ListingMutationVariables = Exact<{
  photos?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  plph?: InputMaybe<Scalars['Float']['input']>;
  pphcr?: InputMaybe<Scalars['Float']['input']>;
  pphcy?: InputMaybe<Scalars['Float']['input']>;
  pphbi?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<PlaceType>;
  country?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  district?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  pincode?: InputMaybe<Scalars['Int']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  landmark?: InputMaybe<Scalars['String']['input']>;
  allowedVehicles?: InputMaybe<Array<InputMaybe<Vehicle>> | InputMaybe<Vehicle>>;
  basePrice?: InputMaybe<Scalars['Float']['input']>;
}>;


export type Update_ListingMutation = { __typename?: 'RootMutation', ListingMutation?: { __typename?: 'ListingMutation', updateListing?: string | null } | null };

export type UpsertProfileMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  landmark?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  pincode?: InputMaybe<Scalars['Int']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  district?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  kyc?: InputMaybe<KycInput>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  timeJoined?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpsertProfileMutation = { __typename?: 'RootMutation', UserMutation?: { __typename?: 'UserMutation', upsertProfile?: string | null } | null };

export type Verify_OtpMutationVariables = Exact<{
  bookingId: Scalars['String']['input'];
  otp: Scalars['Int']['input'];
}>;


export type Verify_OtpMutation = { __typename?: 'RootMutation', BookingMutation?: { __typename?: 'BookingMutation', verifyOTP?: string | null } | null };


export const Aadhar_OtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AADHAR_OTP"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uidai"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserMutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aadharOTP"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uidai"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uidai"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"ref_id"}}]}}]}}]}}]} as unknown as DocumentNode<Aadhar_OtpMutation, Aadhar_OtpMutationVariables>;
export const Aadhar_VerifyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AADHAR_VERIFY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otp"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserMutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aadharVerify"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"otp"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otp"}}},{"kind":"Argument","name":{"kind":"Name","value":"ref_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ref_id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"care_of"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"split_address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"dist"}},{"kind":"Field","name":{"kind":"Name","value":"house"}},{"kind":"Field","name":{"kind":"Name","value":"landmark"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"po"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"subdist"}},{"kind":"Field","name":{"kind":"Name","value":"vtc"}},{"kind":"Field","name":{"kind":"Name","value":"locality"}}]}},{"kind":"Field","name":{"kind":"Name","value":"year_of_birth"}},{"kind":"Field","name":{"kind":"Name","value":"mobile_hash"}},{"kind":"Field","name":{"kind":"Name","value":"photo_link"}},{"kind":"Field","name":{"kind":"Name","value":"share_code"}},{"kind":"Field","name":{"kind":"Name","value":"xml_file"}}]}}]}}]}}]} as unknown as DocumentNode<Aadhar_VerifyMutation, Aadhar_VerifyMutationVariables>;
export const Complete_OrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"COMPLETE_ORDER"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"basePrice"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parkingPrice"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"totalPrice"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ipFee"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CompleteOrderCustomer"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"BookingMutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookingId"}}},{"kind":"Argument","name":{"kind":"Name","value":"listingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listingId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"basePrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"basePrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"parkingPrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parkingPrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"totalPrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"totalPrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"ipFee"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ipFee"}}},{"kind":"Argument","name":{"kind":"Name","value":"customer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customer"}}},{"kind":"Argument","name":{"kind":"Name","value":"vendor_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookingId"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"payment_session_id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<Complete_OrderMutation, Complete_OrderMutationVariables>;
export const CompleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"COMPLETE"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookingId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"BookingMutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"complete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bookingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookingId"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]}}]} as unknown as DocumentNode<CompleteMutation, CompleteMutationVariables>;
export const Create_BookDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CREATE_BOOK"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookingId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"BookingMutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"book"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bookingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookingId"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]}}]} as unknown as DocumentNode<Create_BookMutation, Create_BookMutationVariables>;
export const CreateListingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateListing"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaceType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"country"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"state"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"district"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"city"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"street"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pincode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"allowedVehicles"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Vehicle"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"basePrice"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pphbi"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pphcy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pphcr"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"plph"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"photos"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"landmark"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ListingMutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createListing"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"country"},"value":{"kind":"Variable","name":{"kind":"Name","value":"country"}}},{"kind":"Argument","name":{"kind":"Name","value":"state"},"value":{"kind":"Variable","name":{"kind":"Name","value":"state"}}},{"kind":"Argument","name":{"kind":"Name","value":"district"},"value":{"kind":"Variable","name":{"kind":"Name","value":"district"}}},{"kind":"Argument","name":{"kind":"Name","value":"city"},"value":{"kind":"Variable","name":{"kind":"Name","value":"city"}}},{"kind":"Argument","name":{"kind":"Name","value":"street"},"value":{"kind":"Variable","name":{"kind":"Name","value":"street"}}},{"kind":"Argument","name":{"kind":"Name","value":"pincode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pincode"}}},{"kind":"Argument","name":{"kind":"Name","value":"latitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}}},{"kind":"Argument","name":{"kind":"Name","value":"longitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}}},{"kind":"Argument","name":{"kind":"Name","value":"allowedVehicles"},"value":{"kind":"Variable","name":{"kind":"Name","value":"allowedVehicles"}}},{"kind":"Argument","name":{"kind":"Name","value":"basePrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"basePrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"pphbi"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pphbi"}}},{"kind":"Argument","name":{"kind":"Name","value":"pphcy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pphcy"}}},{"kind":"Argument","name":{"kind":"Name","value":"pphcr"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pphcr"}}},{"kind":"Argument","name":{"kind":"Name","value":"plph"},"value":{"kind":"Variable","name":{"kind":"Name","value":"plph"}}},{"kind":"Argument","name":{"kind":"Name","value":"photos"},"value":{"kind":"Variable","name":{"kind":"Name","value":"photos"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"landmark"},"value":{"kind":"Variable","name":{"kind":"Name","value":"landmark"}}}]}]}}]}}]} as unknown as DocumentNode<CreateListingMutation, CreateListingMutationVariables>;
export const LockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LOCK"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"basePrice"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parkingPrice"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"totalPrice"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vehicle"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Vehicle"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ipFee"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LockCustomer"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"BookingMutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"listingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listingId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"basePrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"basePrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"parkingPrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parkingPrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"totalPrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"totalPrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"vehicle"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vehicle"}}},{"kind":"Argument","name":{"kind":"Name","value":"ipFee"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ipFee"}}},{"kind":"Argument","name":{"kind":"Name","value":"customer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customer"}}},{"kind":"Argument","name":{"kind":"Name","value":"vendor_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookingId"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"payment_session_id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<LockMutation, LockMutationVariables>;
export const CreateVendorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateVendor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bank"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"VendorBankInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"kyc_details"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"VendorKYCInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendor_id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"VendorMutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createVendor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}},{"kind":"Argument","name":{"kind":"Name","value":"bank"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bank"}}},{"kind":"Argument","name":{"kind":"Name","value":"kyc_details"},"value":{"kind":"Variable","name":{"kind":"Name","value":"kyc_details"}}},{"kind":"Argument","name":{"kind":"Name","value":"vendor_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendor_id"}}}]}]}}]}}]} as unknown as DocumentNode<CreateVendorMutation, CreateVendorMutationVariables>;
export const GetEarningsDashboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEarningsDashboard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"VendorQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEarningsDashboard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"earnings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentMonth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalBookings"}},{"kind":"Field","name":{"kind":"Name","value":"totalRevenue"}},{"kind":"Field","name":{"kind":"Name","value":"totalNetProfit"}},{"kind":"Field","name":{"kind":"Name","value":"avgBookingValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"previousMonth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalBookings"}},{"kind":"Field","name":{"kind":"Name","value":"totalRevenue"}},{"kind":"Field","name":{"kind":"Name","value":"totalNetProfit"}},{"kind":"Field","name":{"kind":"Name","value":"avgBookingValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"netPL"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalBookingsPLPercent"}},{"kind":"Field","name":{"kind":"Name","value":"totalRevenuePLPercent"}},{"kind":"Field","name":{"kind":"Name","value":"totalNetProfitPLPercent"}},{"kind":"Field","name":{"kind":"Name","value":"avgBookingValuePLPercent"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vendorBalance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vendorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendor_id"}},{"kind":"Field","name":{"kind":"Name","value":"vendor_unsettled"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetEarningsDashboardQuery, GetEarningsDashboardQueryVariables>;
export const Get_ProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GET_PROFILE"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"timeJoined"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"kyc"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uidai"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"district"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"landmark"}}]}}]}}]}}]} as unknown as DocumentNode<Get_ProfileQuery, Get_ProfileQueryVariables>;
export const Get_Recon_DataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GET_RECON_DATA"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entityType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"BookingQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buyerBookings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"booking"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reconData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"entity_type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entityType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"merchant_order_id"}},{"kind":"Field","name":{"kind":"Name","value":"tx_time"}},{"kind":"Field","name":{"kind":"Name","value":"settled"}},{"kind":"Field","name":{"kind":"Name","value":"entity_id"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"sale_type"}},{"kind":"Field","name":{"kind":"Name","value":"customer_email"}},{"kind":"Field","name":{"kind":"Name","value":"customer_phone"}},{"kind":"Field","name":{"kind":"Name","value":"added_on"}},{"kind":"Field","name":{"kind":"Name","value":"entity_type"}},{"kind":"Field","name":{"kind":"Name","value":"settlement_eligibility_time"}},{"kind":"Field","name":{"kind":"Name","value":"merchant_settlement_utr"}},{"kind":"Field","name":{"kind":"Name","value":"payment_utr"}},{"kind":"Field","name":{"kind":"Name","value":"merchant_vendor_commission"}},{"kind":"Field","name":{"kind":"Name","value":"split_service_charge"}},{"kind":"Field","name":{"kind":"Name","value":"split_service_tax"}},{"kind":"Field","name":{"kind":"Name","value":"pg_service_tax"}},{"kind":"Field","name":{"kind":"Name","value":"pg_service_charge"}},{"kind":"Field","name":{"kind":"Name","value":"pg_charge_postpaid"}},{"kind":"Field","name":{"kind":"Name","value":"merchant_settlement_id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"settlement_initiated_on"}},{"kind":"Field","name":{"kind":"Name","value":"settlement_time"}},{"kind":"Field","name":{"kind":"Name","value":"eligible_split_balance"}},{"kind":"Field","name":{"kind":"Name","value":"order_splits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"split"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"merchant_vendor_id"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"merchant_vendor_id"}},{"kind":"Field","name":{"kind":"Name","value":"vendor_settlement_time"}},{"kind":"Field","name":{"kind":"Name","value":"vendor_settlement_initiated_on"}},{"kind":"Field","name":{"kind":"Name","value":"vendor_settlement_eligibility_time"}},{"kind":"Field","name":{"kind":"Name","value":"vendor_settlement_id"}},{"kind":"Field","name":{"kind":"Name","value":"vendor_commission"}},{"kind":"Field","name":{"kind":"Name","value":"vendor_pg_service_charge"}},{"kind":"Field","name":{"kind":"Name","value":"vendor_pg_service_tax"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<Get_Recon_DataQuery, Get_Recon_DataQueryVariables>;
export const Get_Trip_DetailedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GET_TRIP_DETAILED"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"BookingQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buyerBookings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"booking"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"listingId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"lockedAt"}},{"kind":"Field","name":{"kind":"Name","value":"basePrice"}},{"kind":"Field","name":{"kind":"Name","value":"parkingPrice"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"ipFee"}},{"kind":"Field","name":{"kind":"Name","value":"penalty"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"payments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookingId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"order"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart_details"}},{"kind":"Field","name":{"kind":"Name","value":"cf_order_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"customer_details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer_id"}},{"kind":"Field","name":{"kind":"Name","value":"customer_name"}},{"kind":"Field","name":{"kind":"Name","value":"customer_email"}},{"kind":"Field","name":{"kind":"Name","value":"customer_phone"}},{"kind":"Field","name":{"kind":"Name","value":"customer_uid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"entity"}},{"kind":"Field","name":{"kind":"Name","value":"order_amount"}},{"kind":"Field","name":{"kind":"Name","value":"order_currency"}},{"kind":"Field","name":{"kind":"Name","value":"order_expiry_time"}},{"kind":"Field","name":{"kind":"Name","value":"order_id"}},{"kind":"Field","name":{"kind":"Name","value":"order_meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"return_url"}},{"kind":"Field","name":{"kind":"Name","value":"notify_url"}},{"kind":"Field","name":{"kind":"Name","value":"payment_methods"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order_note"}},{"kind":"Field","name":{"kind":"Name","value":"order_splits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendor_id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order_status"}},{"kind":"Field","name":{"kind":"Name","value":"order_tags"}},{"kind":"Field","name":{"kind":"Name","value":"payment_session_id"}},{"kind":"Field","name":{"kind":"Name","value":"terminal_data"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"otp"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookingId"}},{"kind":"Field","name":{"kind":"Name","value":"otp"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"listing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"district"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"landmark"}},{"kind":"Field","name":{"kind":"Name","value":"allowedVehicles"}},{"kind":"Field","name":{"kind":"Name","value":"basePrice"}},{"kind":"Field","name":{"kind":"Name","value":"pphbi"}},{"kind":"Field","name":{"kind":"Name","value":"pphcy"}},{"kind":"Field","name":{"kind":"Name","value":"pphcr"}},{"kind":"Field","name":{"kind":"Name","value":"plph"}},{"kind":"Field","name":{"kind":"Name","value":"photos"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"timeJoined"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<Get_Trip_DetailedQuery, Get_Trip_DetailedQueryVariables>;
export const Get_TripsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GET_TRIPS"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BookingStatus"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"BookingQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buyerBookings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"booking"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"listingId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"lockedAt"}},{"kind":"Field","name":{"kind":"Name","value":"basePrice"}},{"kind":"Field","name":{"kind":"Name","value":"parkingPrice"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"ipFee"}},{"kind":"Field","name":{"kind":"Name","value":"penalty"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"payments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookingId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"order"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart_details"}},{"kind":"Field","name":{"kind":"Name","value":"cf_order_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"customer_details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer_id"}},{"kind":"Field","name":{"kind":"Name","value":"customer_name"}},{"kind":"Field","name":{"kind":"Name","value":"customer_email"}},{"kind":"Field","name":{"kind":"Name","value":"customer_phone"}},{"kind":"Field","name":{"kind":"Name","value":"customer_uid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"entity"}},{"kind":"Field","name":{"kind":"Name","value":"order_amount"}},{"kind":"Field","name":{"kind":"Name","value":"order_currency"}},{"kind":"Field","name":{"kind":"Name","value":"order_expiry_time"}},{"kind":"Field","name":{"kind":"Name","value":"order_id"}},{"kind":"Field","name":{"kind":"Name","value":"order_meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"return_url"}},{"kind":"Field","name":{"kind":"Name","value":"notify_url"}},{"kind":"Field","name":{"kind":"Name","value":"payment_methods"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order_note"}},{"kind":"Field","name":{"kind":"Name","value":"order_splits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendor_id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order_status"}},{"kind":"Field","name":{"kind":"Name","value":"order_tags"}},{"kind":"Field","name":{"kind":"Name","value":"payment_session_id"}},{"kind":"Field","name":{"kind":"Name","value":"terminal_data"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"otp"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookingId"}},{"kind":"Field","name":{"kind":"Name","value":"otp"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"listing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"district"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"landmark"}},{"kind":"Field","name":{"kind":"Name","value":"allowedVehicles"}},{"kind":"Field","name":{"kind":"Name","value":"basePrice"}},{"kind":"Field","name":{"kind":"Name","value":"pphbi"}},{"kind":"Field","name":{"kind":"Name","value":"pphcy"}},{"kind":"Field","name":{"kind":"Name","value":"pphcr"}},{"kind":"Field","name":{"kind":"Name","value":"plph"}},{"kind":"Field","name":{"kind":"Name","value":"photos"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOpen"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"timeJoined"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"kyc"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uidai"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"district"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"landmark"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<Get_TripsQuery, Get_TripsQueryVariables>;
export const GetVendorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVendor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"VendorQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVendor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vendorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"bank"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account_number"}},{"kind":"Field","name":{"kind":"Name","value":"account_holder"}},{"kind":"Field","name":{"kind":"Name","value":"ifsc"}}]}},{"kind":"Field","name":{"kind":"Name","value":"kyc_details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account_type"}},{"kind":"Field","name":{"kind":"Name","value":"business_type"}},{"kind":"Field","name":{"kind":"Name","value":"pan"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vendor_id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"verify_account"}},{"kind":"Field","name":{"kind":"Name","value":"dashboard_access"}},{"kind":"Field","name":{"kind":"Name","value":"schedule_option"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settlement_schedule_message"}},{"kind":"Field","name":{"kind":"Name","value":"schedule_id"}},{"kind":"Field","name":{"kind":"Name","value":"merchant_default"}}]}},{"kind":"Field","name":{"kind":"Name","value":"related_docs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"doc_name"}},{"kind":"Field","name":{"kind":"Name","value":"doc_value"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"remarks"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetVendorQuery, GetVendorQueryVariables>;
export const HostBookingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HostBookings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BookingStatus"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ListingQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hostBookings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"booking"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"listingId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"lockedAt"}},{"kind":"Field","name":{"kind":"Name","value":"basePrice"}},{"kind":"Field","name":{"kind":"Name","value":"parkingPrice"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"ipFee"}},{"kind":"Field","name":{"kind":"Name","value":"penalty"}},{"kind":"Field","name":{"kind":"Name","value":"vehicle"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"timeJoined"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"kyc"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uidai"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"district"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"landmark"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookingId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"order"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart_details"}},{"kind":"Field","name":{"kind":"Name","value":"cf_order_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"customer_details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer_id"}},{"kind":"Field","name":{"kind":"Name","value":"customer_name"}},{"kind":"Field","name":{"kind":"Name","value":"customer_email"}},{"kind":"Field","name":{"kind":"Name","value":"customer_phone"}},{"kind":"Field","name":{"kind":"Name","value":"customer_uid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"entity"}},{"kind":"Field","name":{"kind":"Name","value":"order_amount"}},{"kind":"Field","name":{"kind":"Name","value":"order_currency"}},{"kind":"Field","name":{"kind":"Name","value":"order_expiry_time"}},{"kind":"Field","name":{"kind":"Name","value":"order_id"}},{"kind":"Field","name":{"kind":"Name","value":"order_meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"return_url"}},{"kind":"Field","name":{"kind":"Name","value":"notify_url"}},{"kind":"Field","name":{"kind":"Name","value":"payment_methods"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order_note"}},{"kind":"Field","name":{"kind":"Name","value":"order_splits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendor_id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order_status"}},{"kind":"Field","name":{"kind":"Name","value":"order_tags"}},{"kind":"Field","name":{"kind":"Name","value":"payment_session_id"}},{"kind":"Field","name":{"kind":"Name","value":"terminal_data"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"otp"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookingId"}},{"kind":"Field","name":{"kind":"Name","value":"otp"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"listing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"district"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"landmark"}},{"kind":"Field","name":{"kind":"Name","value":"allowedVehicles"}},{"kind":"Field","name":{"kind":"Name","value":"basePrice"}},{"kind":"Field","name":{"kind":"Name","value":"pphbi"}},{"kind":"Field","name":{"kind":"Name","value":"pphcy"}},{"kind":"Field","name":{"kind":"Name","value":"pphcr"}},{"kind":"Field","name":{"kind":"Name","value":"plph"}},{"kind":"Field","name":{"kind":"Name","value":"photos"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOpen"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"timeJoined"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"kyc"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uidai"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"district"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"landmark"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<HostBookingsQuery, HostBookingsQueryVariables>;
export const Host_ListingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HOST_LISTINGS"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ListingQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hostListings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"district"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"landmark"}},{"kind":"Field","name":{"kind":"Name","value":"allowedVehicles"}},{"kind":"Field","name":{"kind":"Name","value":"basePrice"}},{"kind":"Field","name":{"kind":"Name","value":"pphbi"}},{"kind":"Field","name":{"kind":"Name","value":"pphcy"}},{"kind":"Field","name":{"kind":"Name","value":"pphcr"}},{"kind":"Field","name":{"kind":"Name","value":"plph"}},{"kind":"Field","name":{"kind":"Name","value":"photos"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOpen"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"timeJoined"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"kyc"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uidai"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"district"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"landmark"}}]}}]}}]}}]}}]} as unknown as DocumentNode<Host_ListingsQuery, Host_ListingsQueryVariables>;
export const Pricing_CalculatorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PRICING_CALCULATOR"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vehicle"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Vehicle"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ListingQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hostListings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"calulator"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"vehicle"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vehicle"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"separator"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vehicles"}},{"kind":"Field","name":{"kind":"Name","value":"hourly"}}]}}]}}]}}]}}]} as unknown as DocumentNode<Pricing_CalculatorQuery, Pricing_CalculatorQueryVariables>;
export const SearchListingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchListings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"street"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vehicleType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Vehicle"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ListingQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchListings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"street"},"value":{"kind":"Variable","name":{"kind":"Name","value":"street"}}},{"kind":"Argument","name":{"kind":"Name","value":"vehicleType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vehicleType"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"district"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"landmark"}},{"kind":"Field","name":{"kind":"Name","value":"allowedVehicles"}},{"kind":"Field","name":{"kind":"Name","value":"basePrice"}},{"kind":"Field","name":{"kind":"Name","value":"pphbi"}},{"kind":"Field","name":{"kind":"Name","value":"pphcy"}},{"kind":"Field","name":{"kind":"Name","value":"pphcr"}},{"kind":"Field","name":{"kind":"Name","value":"plph"}},{"kind":"Field","name":{"kind":"Name","value":"photos"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOpen"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<SearchListingsQuery, SearchListingsQueryVariables>;
export const Update_ListingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UPDATE_LISTING"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"photos"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"plph"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pphcr"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pphcy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pphbi"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaceType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"country"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"state"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"district"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"city"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"street"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pincode"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"landmark"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"allowedVehicles"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Vehicle"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"basePrice"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ListingMutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateListing"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"photos"},"value":{"kind":"Variable","name":{"kind":"Name","value":"photos"}}},{"kind":"Argument","name":{"kind":"Name","value":"plph"},"value":{"kind":"Variable","name":{"kind":"Name","value":"plph"}}},{"kind":"Argument","name":{"kind":"Name","value":"pphcr"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pphcr"}}},{"kind":"Argument","name":{"kind":"Name","value":"pphcy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pphcy"}}},{"kind":"Argument","name":{"kind":"Name","value":"pphbi"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pphbi"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"country"},"value":{"kind":"Variable","name":{"kind":"Name","value":"country"}}},{"kind":"Argument","name":{"kind":"Name","value":"state"},"value":{"kind":"Variable","name":{"kind":"Name","value":"state"}}},{"kind":"Argument","name":{"kind":"Name","value":"district"},"value":{"kind":"Variable","name":{"kind":"Name","value":"district"}}},{"kind":"Argument","name":{"kind":"Name","value":"city"},"value":{"kind":"Variable","name":{"kind":"Name","value":"city"}}},{"kind":"Argument","name":{"kind":"Name","value":"street"},"value":{"kind":"Variable","name":{"kind":"Name","value":"street"}}},{"kind":"Argument","name":{"kind":"Name","value":"pincode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pincode"}}},{"kind":"Argument","name":{"kind":"Name","value":"latitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}}},{"kind":"Argument","name":{"kind":"Name","value":"longitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"landmark"},"value":{"kind":"Variable","name":{"kind":"Name","value":"landmark"}}},{"kind":"Argument","name":{"kind":"Name","value":"allowedVehicles"},"value":{"kind":"Variable","name":{"kind":"Name","value":"allowedVehicles"}}},{"kind":"Argument","name":{"kind":"Name","value":"basePrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"basePrice"}}}]}]}}]}}]} as unknown as DocumentNode<Update_ListingMutation, Update_ListingMutationVariables>;
export const UpsertProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"landmark"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pincode"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"street"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"city"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"district"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"state"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"country"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"kyc"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"KYCInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"timeJoined"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phoneNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserMutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"landmark"},"value":{"kind":"Variable","name":{"kind":"Name","value":"landmark"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"pincode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pincode"}}},{"kind":"Argument","name":{"kind":"Name","value":"street"},"value":{"kind":"Variable","name":{"kind":"Name","value":"street"}}},{"kind":"Argument","name":{"kind":"Name","value":"city"},"value":{"kind":"Variable","name":{"kind":"Name","value":"city"}}},{"kind":"Argument","name":{"kind":"Name","value":"district"},"value":{"kind":"Variable","name":{"kind":"Name","value":"district"}}},{"kind":"Argument","name":{"kind":"Name","value":"state"},"value":{"kind":"Variable","name":{"kind":"Name","value":"state"}}},{"kind":"Argument","name":{"kind":"Name","value":"country"},"value":{"kind":"Variable","name":{"kind":"Name","value":"country"}}},{"kind":"Argument","name":{"kind":"Name","value":"kyc"},"value":{"kind":"Variable","name":{"kind":"Name","value":"kyc"}}},{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"timeJoined"},"value":{"kind":"Variable","name":{"kind":"Name","value":"timeJoined"}}},{"kind":"Argument","name":{"kind":"Name","value":"phoneNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phoneNumber"}}}]}]}}]}}]} as unknown as DocumentNode<UpsertProfileMutation, UpsertProfileMutationVariables>;
export const Verify_OtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VERIFY_OTP"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otp"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"BookingMutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyOTP"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bookingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookingId"}}},{"kind":"Argument","name":{"kind":"Name","value":"otp"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otp"}}}]}]}}]}}]} as unknown as DocumentNode<Verify_OtpMutation, Verify_OtpMutationVariables>;