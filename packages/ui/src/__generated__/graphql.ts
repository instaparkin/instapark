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

export type Booking = {
  __typename?: 'Booking';
  basePrice?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['Int']['output']>;
  endDate?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  ipFee?: Maybe<Scalars['Float']['output']>;
  listing?: Maybe<Listing>;
  listingId?: Maybe<Scalars['String']['output']>;
  lockedAt?: Maybe<Scalars['Int']['output']>;
  parkingPrice?: Maybe<Scalars['Float']['output']>;
  payments?: Maybe<Array<Maybe<Payment>>>;
  startDate?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<BookingStatus>;
  totalPrice?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type BookingExtended = {
  __typename?: 'BookingExtended';
  basePrice?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['Int']['output']>;
  endDate?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  ipFee?: Maybe<Scalars['Float']['output']>;
  listing?: Maybe<Listing>;
  listingId?: Maybe<Scalars['String']['output']>;
  lockedAt?: Maybe<Scalars['Int']['output']>;
  parkingPrice?: Maybe<Scalars['Float']['output']>;
  penalty?: Maybe<Scalars['Float']['output']>;
  startDate?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<BookingStatus>;
  totalPrice?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type BookingMutation = {
  __typename?: 'BookingMutation';
  lock?: Maybe<LockResponse>;
};


export type BookingMutationLockArgs = {
  basePrice: Scalars['Float']['input'];
  endDate: Scalars['Int']['input'];
  ipFee: Scalars['Float']['input'];
  listingId: Scalars['String']['input'];
  parkingPrice: Scalars['Float']['input'];
  startDate: Scalars['Int']['input'];
  totalPrice: Scalars['Float']['input'];
  userId: Scalars['String']['input'];
};

export type BookingQuery = {
  __typename?: 'BookingQuery';
  getBookingsForBuyer?: Maybe<Array<Maybe<Booking>>>;
  getBookingsForHost?: Maybe<Array<Maybe<BookingExtended>>>;
  getEarningsDashboard?: Maybe<EarningsDashboard>;
  getEarningsStats?: Maybe<Earnings>;
  getPaymentsForBuyer?: Maybe<Array<Maybe<Payment>>>;
};


export type BookingQueryGetBookingsForBuyerArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type BookingQueryGetBookingsForHostArgs = {
  status?: InputMaybe<BookingStatus>;
};


export type BookingQueryGetEarningsStatsArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type BookingQueryGetPaymentsForBuyerArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};

export enum BookingStatus {
  Booked = 'Booked',
  Completed = 'Completed',
  Locked = 'Locked',
  OnGoing = 'OnGoing'
}

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
  timeRangeData?: Maybe<Array<Maybe<TimeRangeData>>>;
};

export type EarningsDashboard = {
  __typename?: 'EarningsDashboard';
  earnings?: Maybe<Earnings>;
  vendorBalance?: Maybe<VendorBalance>;
};


export type EarningsDashboardEarningsArgs = {
  timeRange?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type EarningsDashboardVendorBalanceArgs = {
  vendorId?: InputMaybe<Scalars['String']['input']>;
};

export type KycInput = {
  uidai?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Listing = {
  __typename?: 'Listing';
  allowedVehicles: Array<Vehicle>;
  basePrice: Scalars['Float']['output'];
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['Int']['output'];
  district: Scalars['String']['output'];
  earnings?: Maybe<Earnings>;
  id: Scalars['String']['output'];
  isOpen: Scalars['Boolean']['output'];
  landmark: Scalars['String']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  photos: Array<Scalars['String']['output']>;
  pincode: Scalars['Int']['output'];
  plph: Scalars['Float']['output'];
  pphbi: Scalars['Float']['output'];
  pphcr: Scalars['Float']['output'];
  pphcy: Scalars['Float']['output'];
  rating: Scalars['Float']['output'];
  state: Scalars['String']['output'];
  street: Scalars['String']['output'];
  type: PlaceType;
  updatedAt: Scalars['Int']['output'];
  user?: Maybe<Profile>;
  userId: Scalars['String']['output'];
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
  pphbi: Scalars['Float']['input'];
  pphcr: Scalars['Float']['input'];
  pphcy: Scalars['Float']['input'];
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
  id?: InputMaybe<Scalars['String']['input']>;
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
  getListings?: Maybe<Array<Maybe<Listing>>>;
  searchListings?: Maybe<Array<Maybe<Listing>>>;
};


export type ListingQueryGetListingsArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type ListingQuerySearchListingsArgs = {
  endDate?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['Int']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  vehicleType?: InputMaybe<Vehicle>;
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
  order_splits?: Maybe<Array<Maybe<OrderSplit>>>;
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

export type OrderQuery = {
  __typename?: 'OrderQuery';
  getOrder?: Maybe<Order>;
};


export type OrderQueryGetOrderArgs = {
  order_id?: InputMaybe<Scalars['String']['input']>;
};

export type OrderSplit = {
  __typename?: 'OrderSplit';
  amount?: Maybe<Scalars['Float']['output']>;
  percentage?: Maybe<Scalars['Int']['output']>;
  tags?: Maybe<Scalars['String']['output']>;
  vendor_id?: Maybe<Scalars['String']['output']>;
};

export type Payment = {
  __typename?: 'Payment';
  bookingId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Int']['output']>;
  order?: Maybe<Order>;
  orderId?: Maybe<Scalars['String']['output']>;
  paymentType?: Maybe<PaymentType>;
  updatedAt?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
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

export type Profile = {
  __typename?: 'Profile';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  district?: Maybe<Scalars['String']['output']>;
  emails?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  firstName: Scalars['String']['output'];
  kyc?: Maybe<Kyc>;
  landmark?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['Int']['output']>;
  pincode?: Maybe<Scalars['String']['output']>;
  ratings?: Maybe<Scalars['Float']['output']>;
  reviews?: Maybe<Scalars['Int']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  timeJoined?: Maybe<Scalars['Int']['output']>;
  userId: Scalars['String']['output'];
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
  OrderQuery?: Maybe<OrderQuery>;
  UserQuery?: Maybe<UserQuery>;
  VendorQuery?: Maybe<VendorQuery>;
};

export type TimeRangeData = {
  __typename?: 'TimeRangeData';
  date?: Maybe<Scalars['String']['output']>;
  totalPrice?: Maybe<Scalars['Float']['output']>;
};

export type Transaction = {
  __typename?: 'Transaction';
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
  order_splits?: Maybe<Array<Maybe<OrderSplit>>>;
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

export type UserMutation = {
  __typename?: 'UserMutation';
  upsertProfile?: Maybe<Scalars['String']['output']>;
};


export type UserMutationUpsertProfileArgs = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  district?: InputMaybe<Scalars['String']['input']>;
  emails?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  kyc?: InputMaybe<KycInput>;
  landmark?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  pincode?: InputMaybe<Scalars['String']['input']>;
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
  userId?: InputMaybe<Scalars['String']['input']>;
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
  createTransfer?: Maybe<Scalars['String']['output']>;
  createVendor?: Maybe<Scalars['String']['output']>;
};


export type VendorMutationCreateTransferArgs = {
  transfer_amount?: InputMaybe<Scalars['Float']['input']>;
  vendorId?: InputMaybe<Scalars['String']['input']>;
};


export type VendorMutationCreateVendorArgs = {
  bank?: InputMaybe<VendorBankInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  kyc_details?: InputMaybe<VendorKycInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  vendor_id?: InputMaybe<Scalars['String']['input']>;
};

export type VendorQuery = {
  __typename?: 'VendorQuery';
  getTransactions?: Maybe<Array<Maybe<Transaction>>>;
  getVendor?: Maybe<Vendor>;
};


export type VendorQueryGetTransactionsArgs = {
  entity_type?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type VendorQueryGetVendorArgs = {
  vendorId?: InputMaybe<Scalars['String']['input']>;
};

export type VendorSchedule = {
  __typename?: 'VendorSchedule';
  merchant_default?: Maybe<Scalars['Boolean']['output']>;
  schedule_id?: Maybe<Scalars['Int']['output']>;
  settlement_schedule_message?: Maybe<Scalars['String']['output']>;
};

export type Kyc = {
  __typename?: 'kyc';
  uidai?: Maybe<Scalars['String']['output']>;
  verified?: Maybe<Scalars['Boolean']['output']>;
};

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
  pphbi: Scalars['Float']['input'];
  pphcy: Scalars['Float']['input'];
  pphcr: Scalars['Float']['input'];
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
  ipFee: Scalars['Float']['input'];
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
  vendorId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetEarningsDashboardQuery = { __typename?: 'RootQuery', BookingQuery?: { __typename?: 'BookingQuery', getEarningsDashboard?: { __typename?: 'EarningsDashboard', vendorBalance?: { __typename?: 'VendorBalance', vendor_id: string, vendor_unsettled: string } | null, earnings?: { __typename?: 'Earnings', currentMonth?: { __typename?: 'CurrentMonth', totalBookings?: number | null, totalRevenue?: number | null, totalNetProfit?: number | null, avgBookingValue?: number | null } | null, previousMonth?: { __typename?: 'PreviousMonth', totalBookings?: number | null, totalRevenue?: number | null, totalNetProfit?: number | null, avgBookingValue?: number | null } | null, netPL?: { __typename?: 'NetPL', totalBookingsPLPercent?: number | null, totalRevenuePLPercent?: number | null, totalNetProfitPLPercent?: number | null, avgBookingValuePLPercent?: number | null } | null } | null } | null } | null };

export type Get_ListingQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
}>;


export type Get_ListingQuery = { __typename?: 'RootQuery', ListingQuery?: { __typename?: 'ListingQuery', getListings?: Array<{ __typename?: 'Listing', allowedVehicles: Array<Vehicle>, basePrice: number, city: string, country: string, createdAt: number, district: string, id: string, isOpen: boolean, landmark: string, userId: string, type: PlaceType, state: string, street: string, pincode: number, latitude: number, longitude: number, name: string, pphbi: number, pphcy: number, pphcr: number, plph: number, photos: Array<string>, rating: number, updatedAt: number } | null> | null } | null };

export type UserQueryQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type UserQueryQuery = { __typename?: 'RootQuery', UserQuery?: { __typename?: 'UserQuery', getProfile?: { __typename?: 'Profile', userId: string, firstName: string, lastName: string, emails?: Array<string | null> | null, timeJoined?: number | null, phoneNumber?: number | null, country?: string | null, state?: string | null, district?: string | null, city?: string | null, street?: string | null, pincode?: string | null, latitude?: number | null, longitude?: number | null, name?: string | null, landmark?: string | null, kyc?: { __typename?: 'kyc', uidai?: string | null, verified?: boolean | null } | null } | null } | null };

export type GetBookingsForHostQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBookingsForHostQuery = { __typename?: 'RootQuery', BookingQuery?: { __typename?: 'BookingQuery', getBookingsForHost?: Array<{ __typename?: 'BookingExtended', id?: string | null, listingId?: string | null, userId?: string | null, startDate?: number | null, endDate?: number | null, status?: BookingStatus | null, lockedAt?: number | null, createdAt?: number | null, updatedAt?: number | null, totalPrice?: number | null, basePrice?: number | null, parkingPrice?: number | null, listing?: { __typename?: 'Listing', photos: Array<string>, country: string, state: string, city: string, street: string, pincode: number } | null } | null> | null } | null };

export type Get_SettlementsQueryVariables = Exact<{
  orderIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  entityType?: InputMaybe<Scalars['String']['input']>;
}>;


export type Get_SettlementsQuery = { __typename?: 'RootQuery', VendorQuery?: { __typename?: 'VendorQuery', getTransactions?: Array<{ __typename?: 'Transaction', amount?: number | null, merchant_order_id?: string | null, tx_time?: string | null, settled?: string | null, entity_id?: string | null, currency?: string | null, sale_type?: string | null, customer_email?: string | null, customer_phone?: string | null, added_on?: string | null, entity_type?: string | null, settlement_eligibility_time?: string | null, merchant_settlement_utr?: string | null, payment_utr?: string | null, merchant_vendor_commission?: string | null, split_service_charge?: string | null, split_service_tax?: string | null, pg_service_tax?: string | null, pg_service_charge?: string | null, pg_charge_postpaid?: string | null, merchant_settlement_id?: string | null, tags?: string | null, settlement_initiated_on?: string | null, settlement_time?: string | null, eligible_split_balance?: string | null, merchant_vendor_id?: string | null, vendor_settlement_time?: string | null, vendor_settlement_initiated_on?: string | null, vendor_settlement_eligibility_time?: string | null, vendor_settlement_id?: string | null, vendor_commission?: string | null, vendor_pg_service_charge?: string | null, vendor_pg_service_tax?: string | null, status?: string | null, order_splits?: Array<{ __typename?: 'OrderSplit', vendor_id?: string | null, amount?: number | null, percentage?: number | null, tags?: string | null } | null> | null } | null> | null } | null };

export type Get_TransactionsQueryVariables = Exact<{
  orderIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  entityType?: InputMaybe<Scalars['String']['input']>;
}>;


export type Get_TransactionsQuery = { __typename?: 'RootQuery', VendorQuery?: { __typename?: 'VendorQuery', getTransactions?: Array<{ __typename?: 'Transaction', amount?: number | null, merchant_order_id?: string | null, tx_time?: string | null, settled?: string | null, entity_id?: string | null, currency?: string | null, sale_type?: string | null, customer_email?: string | null, customer_phone?: string | null, added_on?: string | null, entity_type?: string | null, settlement_eligibility_time?: string | null, merchant_settlement_utr?: string | null, payment_utr?: string | null, merchant_vendor_commission?: string | null, split_service_charge?: string | null, split_service_tax?: string | null, pg_service_tax?: string | null, pg_service_charge?: string | null, pg_charge_postpaid?: string | null, merchant_settlement_id?: string | null, tags?: string | null, settlement_initiated_on?: string | null, settlement_time?: string | null, eligible_split_balance?: string | null, order_splits?: Array<{ __typename?: 'OrderSplit', vendor_id?: string | null, amount?: number | null, percentage?: number | null, tags?: string | null } | null> | null } | null> | null } | null };

export type Get_TripsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type Get_TripsQuery = { __typename?: 'RootQuery', BookingQuery?: { __typename?: 'BookingQuery', getBookingsForBuyer?: Array<{ __typename?: 'Booking', id?: string | null, listingId?: string | null, userId?: string | null, startDate?: number | null, endDate?: number | null, status?: BookingStatus | null, listing?: { __typename?: 'Listing', userId: string, type: PlaceType, country: string, state: string, district: string, city: string, street: string, pincode: number, name: string, landmark: string, photos: Array<string> } | null, payments?: Array<{ __typename?: 'Payment', bookingId?: string | null, userId?: string | null, orderId?: string | null, paymentType?: PaymentType | null, createdAt?: number | null, updatedAt?: number | null, order?: { __typename?: 'Order', cart_details?: string | null, cf_order_id?: string | null, created_at?: string | null, entity?: string | null, order_amount?: number | null, order_currency?: string | null, order_expiry_time?: string | null, order_id?: string | null, order_note?: string | null, order_status?: string | null, order_tags?: string | null, payment_session_id?: string | null, terminal_data?: string | null, customer_details?: { __typename?: 'CustomerDetails', customer_id?: string | null, customer_name?: string | null, customer_email?: string | null, customer_phone?: string | null, customer_uid?: string | null } | null, order_meta?: { __typename?: 'OrderMeta', return_url?: string | null, notify_url?: string | null, payment_methods?: string | null } | null, order_splits?: Array<{ __typename?: 'OrderSplit', vendor_id?: string | null, amount?: number | null, percentage?: number | null, tags?: string | null } | null> | null } | null } | null> | null } | null> | null } | null };

export type GetVendorQueryVariables = Exact<{
  vendorId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetVendorQuery = { __typename?: 'RootQuery', VendorQuery?: { __typename?: 'VendorQuery', getVendor?: { __typename?: 'Vendor', name?: string | null, email?: string | null, phone?: string | null, vendor_id?: string | null, status?: string | null, verify_account?: boolean | null, dashboard_access?: boolean | null, bank?: { __typename?: 'VendorBank', account_number?: string | null, account_holder?: string | null, ifsc?: string | null } | null, kyc_details?: { __typename?: 'VendorKYC', account_type?: string | null, business_type?: string | null, pan?: string | null } | null, schedule_option?: { __typename?: 'VendorSchedule', settlement_schedule_message?: string | null, schedule_id?: number | null, merchant_default?: boolean | null } | null, related_docs?: Array<{ __typename?: 'VendorDocuments', doc_name?: string | null, doc_value?: string | null, status?: string | null, remarks?: string | null } | null> | null } | null } | null };

export type Search_ListingsQueryVariables = Exact<{ [key: string]: never; }>;


export type Search_ListingsQuery = { __typename?: 'RootQuery', ListingQuery?: { __typename?: 'ListingQuery', searchListings?: Array<{ __typename?: 'Listing', basePrice: number, id: string, isOpen: boolean, state: string, street: string, allowedVehicles: Array<Vehicle>, city: string, country: string, createdAt: number, district: string, landmark: string, userId: string, type: PlaceType, updatedAt: number, rating: number, pphcy: number, latitude: number, longitude: number, name: string, photos: Array<string>, pincode: number, plph: number, pphbi: number, pphcr: number } | null> | null } | null };

export type Get_ListingsQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type Get_ListingsQuery = { __typename?: 'RootQuery', ListingQuery?: { __typename?: 'ListingQuery', getListings?: Array<{ __typename?: 'Listing', allowedVehicles: Array<Vehicle>, basePrice: number, city: string, country: string, createdAt: number, district: string, id: string, isOpen: boolean, landmark: string, userId: string, type: PlaceType, state: string, street: string, pincode: number, latitude: number, longitude: number, name: string, pphbi: number, pphcy: number, pphcr: number, plph: number, photos: Array<string>, rating: number, updatedAt: number } | null> | null } | null };

export type Get_Completed_BookingsQueryVariables = Exact<{ [key: string]: never; }>;


export type Get_Completed_BookingsQuery = { __typename?: 'RootQuery', BookingQuery?: { __typename?: 'BookingQuery', getBookingsForHost?: Array<{ __typename?: 'BookingExtended', id?: string | null, listingId?: string | null, userId?: string | null, startDate?: number | null, endDate?: number | null, status?: BookingStatus | null, lockedAt?: number | null, createdAt?: number | null, updatedAt?: number | null } | null> | null } | null };

export type Get_Checkingout_BookingsQueryVariables = Exact<{ [key: string]: never; }>;


export type Get_Checkingout_BookingsQuery = { __typename?: 'RootQuery', BookingQuery?: { __typename?: 'BookingQuery', getBookingsForHost?: Array<{ __typename?: 'BookingExtended', id?: string | null, listingId?: string | null, userId?: string | null, startDate?: number | null, endDate?: number | null, status?: BookingStatus | null, lockedAt?: number | null, createdAt?: number | null, updatedAt?: number | null } | null> | null } | null };

export type Get_TripQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type Get_TripQuery = { __typename?: 'RootQuery', BookingQuery?: { __typename?: 'BookingQuery', getBookingsForBuyer?: Array<{ __typename?: 'Booking', id?: string | null, listingId?: string | null, userId?: string | null, startDate?: number | null, endDate?: number | null, status?: BookingStatus | null, lockedAt?: number | null, ipFee?: number | null, basePrice?: number | null, totalPrice?: number | null, parkingPrice?: number | null, createdAt?: number | null, updatedAt?: number | null, listing?: { __typename?: 'Listing', userId: string, type: PlaceType, country: string, state: string, district: string, city: string, street: string, pincode: number, latitude: number, longitude: number, name: string, landmark: string, allowedVehicles: Array<Vehicle>, basePrice: number, pphbi: number, pphcy: number, pphcr: number, plph: number, photos: Array<string>, id: string, isOpen: boolean, rating: number, createdAt: number, updatedAt: number, user?: { __typename?: 'Profile', userId: string, firstName: string, lastName: string, emails?: Array<string | null> | null, timeJoined?: number | null, phoneNumber?: number | null, country?: string | null, state?: string | null, district?: string | null, city?: string | null, street?: string | null, pincode?: string | null, latitude?: number | null, longitude?: number | null, name?: string | null, landmark?: string | null, ratings?: number | null, reviews?: number | null, kyc?: { __typename?: 'kyc', uidai?: string | null, verified?: boolean | null } | null } | null } | null, payments?: Array<{ __typename?: 'Payment', bookingId?: string | null, userId?: string | null, orderId?: string | null, paymentType?: PaymentType | null, createdAt?: number | null, updatedAt?: number | null, order?: { __typename?: 'Order', cart_details?: string | null, cf_order_id?: string | null, created_at?: string | null, entity?: string | null, order_amount?: number | null, order_currency?: string | null, order_expiry_time?: string | null, order_id?: string | null, order_note?: string | null, order_status?: string | null, order_tags?: string | null, payment_session_id?: string | null, terminal_data?: string | null, customer_details?: { __typename?: 'CustomerDetails', customer_id?: string | null, customer_name?: string | null, customer_email?: string | null, customer_phone?: string | null, customer_uid?: string | null } | null, order_meta?: { __typename?: 'OrderMeta', return_url?: string | null, notify_url?: string | null, payment_methods?: string | null } | null, order_splits?: Array<{ __typename?: 'OrderSplit', vendor_id?: string | null, amount?: number | null, percentage?: number | null, tags?: string | null } | null> | null } | null } | null> | null } | null> | null } | null };


export const CreateListingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateListing"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaceType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"country"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"state"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"district"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"city"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"street"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pincode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"allowedVehicles"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Vehicle"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"basePrice"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pphbi"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pphcy"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pphcr"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"plph"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"photos"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"landmark"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ListingMutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createListing"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"country"},"value":{"kind":"Variable","name":{"kind":"Name","value":"country"}}},{"kind":"Argument","name":{"kind":"Name","value":"state"},"value":{"kind":"Variable","name":{"kind":"Name","value":"state"}}},{"kind":"Argument","name":{"kind":"Name","value":"district"},"value":{"kind":"Variable","name":{"kind":"Name","value":"district"}}},{"kind":"Argument","name":{"kind":"Name","value":"city"},"value":{"kind":"Variable","name":{"kind":"Name","value":"city"}}},{"kind":"Argument","name":{"kind":"Name","value":"street"},"value":{"kind":"Variable","name":{"kind":"Name","value":"street"}}},{"kind":"Argument","name":{"kind":"Name","value":"pincode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pincode"}}},{"kind":"Argument","name":{"kind":"Name","value":"latitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}}},{"kind":"Argument","name":{"kind":"Name","value":"longitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}}},{"kind":"Argument","name":{"kind":"Name","value":"allowedVehicles"},"value":{"kind":"Variable","name":{"kind":"Name","value":"allowedVehicles"}}},{"kind":"Argument","name":{"kind":"Name","value":"basePrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"basePrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"pphbi"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pphbi"}}},{"kind":"Argument","name":{"kind":"Name","value":"pphcy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pphcy"}}},{"kind":"Argument","name":{"kind":"Name","value":"pphcr"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pphcr"}}},{"kind":"Argument","name":{"kind":"Name","value":"plph"},"value":{"kind":"Variable","name":{"kind":"Name","value":"plph"}}},{"kind":"Argument","name":{"kind":"Name","value":"photos"},"value":{"kind":"Variable","name":{"kind":"Name","value":"photos"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"landmark"},"value":{"kind":"Variable","name":{"kind":"Name","value":"landmark"}}}]}]}}]}}]} as unknown as DocumentNode<CreateListingMutation, CreateListingMutationVariables>;
export const LockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Lock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"basePrice"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parkingPrice"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"totalPrice"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ipFee"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"BookingMutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"listingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listingId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"basePrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"basePrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"parkingPrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parkingPrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"totalPrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"totalPrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"ipFee"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ipFee"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookingId"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"payment_session_id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<LockMutation, LockMutationVariables>;
export const CreateVendorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateVendor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bank"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"VendorBankInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"kyc_details"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"VendorKYCInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendor_id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"VendorMutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createVendor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}},{"kind":"Argument","name":{"kind":"Name","value":"bank"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bank"}}},{"kind":"Argument","name":{"kind":"Name","value":"kyc_details"},"value":{"kind":"Variable","name":{"kind":"Name","value":"kyc_details"}}},{"kind":"Argument","name":{"kind":"Name","value":"vendor_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendor_id"}}}]}]}}]}}]} as unknown as DocumentNode<CreateVendorMutation, CreateVendorMutationVariables>;
export const GetEarningsDashboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEarningsDashboard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"BookingQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEarningsDashboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendorBalance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vendorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendor_id"}},{"kind":"Field","name":{"kind":"Name","value":"vendor_unsettled"}}]}},{"kind":"Field","name":{"kind":"Name","value":"earnings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentMonth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalBookings"}},{"kind":"Field","name":{"kind":"Name","value":"totalRevenue"}},{"kind":"Field","name":{"kind":"Name","value":"totalNetProfit"}},{"kind":"Field","name":{"kind":"Name","value":"avgBookingValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"previousMonth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalBookings"}},{"kind":"Field","name":{"kind":"Name","value":"totalRevenue"}},{"kind":"Field","name":{"kind":"Name","value":"totalNetProfit"}},{"kind":"Field","name":{"kind":"Name","value":"avgBookingValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"netPL"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalBookingsPLPercent"}},{"kind":"Field","name":{"kind":"Name","value":"totalRevenuePLPercent"}},{"kind":"Field","name":{"kind":"Name","value":"totalNetProfitPLPercent"}},{"kind":"Field","name":{"kind":"Name","value":"avgBookingValuePLPercent"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetEarningsDashboardQuery, GetEarningsDashboardQueryVariables>;
export const Get_ListingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GET_LISTING"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ListingQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getListings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowedVehicles"}},{"kind":"Field","name":{"kind":"Name","value":"basePrice"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"district"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOpen"}},{"kind":"Field","name":{"kind":"Name","value":"landmark"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pphbi"}},{"kind":"Field","name":{"kind":"Name","value":"pphcy"}},{"kind":"Field","name":{"kind":"Name","value":"pphcr"}},{"kind":"Field","name":{"kind":"Name","value":"plph"}},{"kind":"Field","name":{"kind":"Name","value":"photos"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<Get_ListingQuery, Get_ListingQueryVariables>;
export const UserQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"emails"}},{"kind":"Field","name":{"kind":"Name","value":"timeJoined"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"kyc"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uidai"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"district"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"landmark"}}]}}]}}]}}]} as unknown as DocumentNode<UserQueryQuery, UserQueryQueryVariables>;
export const GetBookingsForHostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBookingsForHost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"BookingQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBookingsForHost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"EnumValue","value":"Booked"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"listingId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"lockedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"basePrice"}},{"kind":"Field","name":{"kind":"Name","value":"parkingPrice"}},{"kind":"Field","name":{"kind":"Name","value":"listing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"photos"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetBookingsForHostQuery, GetBookingsForHostQueryVariables>;
export const Get_SettlementsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GET_SETTLEMENTS"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderIds"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entityType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"VendorQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTransactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"entity_type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entityType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"merchant_order_id"}},{"kind":"Field","name":{"kind":"Name","value":"tx_time"}},{"kind":"Field","name":{"kind":"Name","value":"settled"}},{"kind":"Field","name":{"kind":"Name","value":"entity_id"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"sale_type"}},{"kind":"Field","name":{"kind":"Name","value":"customer_email"}},{"kind":"Field","name":{"kind":"Name","value":"customer_phone"}},{"kind":"Field","name":{"kind":"Name","value":"added_on"}},{"kind":"Field","name":{"kind":"Name","value":"entity_type"}},{"kind":"Field","name":{"kind":"Name","value":"settlement_eligibility_time"}},{"kind":"Field","name":{"kind":"Name","value":"merchant_settlement_utr"}},{"kind":"Field","name":{"kind":"Name","value":"payment_utr"}},{"kind":"Field","name":{"kind":"Name","value":"merchant_vendor_commission"}},{"kind":"Field","name":{"kind":"Name","value":"split_service_charge"}},{"kind":"Field","name":{"kind":"Name","value":"split_service_tax"}},{"kind":"Field","name":{"kind":"Name","value":"pg_service_tax"}},{"kind":"Field","name":{"kind":"Name","value":"pg_service_charge"}},{"kind":"Field","name":{"kind":"Name","value":"pg_charge_postpaid"}},{"kind":"Field","name":{"kind":"Name","value":"merchant_settlement_id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"settlement_initiated_on"}},{"kind":"Field","name":{"kind":"Name","value":"settlement_time"}},{"kind":"Field","name":{"kind":"Name","value":"eligible_split_balance"}},{"kind":"Field","name":{"kind":"Name","value":"order_splits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendor_id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"Field","name":{"kind":"Name","value":"merchant_vendor_id"}},{"kind":"Field","name":{"kind":"Name","value":"vendor_settlement_time"}},{"kind":"Field","name":{"kind":"Name","value":"vendor_settlement_initiated_on"}},{"kind":"Field","name":{"kind":"Name","value":"vendor_settlement_eligibility_time"}},{"kind":"Field","name":{"kind":"Name","value":"vendor_settlement_id"}},{"kind":"Field","name":{"kind":"Name","value":"vendor_commission"}},{"kind":"Field","name":{"kind":"Name","value":"vendor_pg_service_charge"}},{"kind":"Field","name":{"kind":"Name","value":"vendor_pg_service_tax"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<Get_SettlementsQuery, Get_SettlementsQueryVariables>;
export const Get_TransactionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GET_TRANSACTIONS"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderIds"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entityType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"VendorQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTransactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"entity_type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entityType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"merchant_order_id"}},{"kind":"Field","name":{"kind":"Name","value":"tx_time"}},{"kind":"Field","name":{"kind":"Name","value":"settled"}},{"kind":"Field","name":{"kind":"Name","value":"entity_id"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"sale_type"}},{"kind":"Field","name":{"kind":"Name","value":"customer_email"}},{"kind":"Field","name":{"kind":"Name","value":"customer_phone"}},{"kind":"Field","name":{"kind":"Name","value":"added_on"}},{"kind":"Field","name":{"kind":"Name","value":"entity_type"}},{"kind":"Field","name":{"kind":"Name","value":"settlement_eligibility_time"}},{"kind":"Field","name":{"kind":"Name","value":"merchant_settlement_utr"}},{"kind":"Field","name":{"kind":"Name","value":"payment_utr"}},{"kind":"Field","name":{"kind":"Name","value":"merchant_vendor_commission"}},{"kind":"Field","name":{"kind":"Name","value":"split_service_charge"}},{"kind":"Field","name":{"kind":"Name","value":"split_service_tax"}},{"kind":"Field","name":{"kind":"Name","value":"pg_service_tax"}},{"kind":"Field","name":{"kind":"Name","value":"pg_service_charge"}},{"kind":"Field","name":{"kind":"Name","value":"pg_charge_postpaid"}},{"kind":"Field","name":{"kind":"Name","value":"merchant_settlement_id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"settlement_initiated_on"}},{"kind":"Field","name":{"kind":"Name","value":"settlement_time"}},{"kind":"Field","name":{"kind":"Name","value":"eligible_split_balance"}},{"kind":"Field","name":{"kind":"Name","value":"order_splits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendor_id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]}}]}}]} as unknown as DocumentNode<Get_TransactionsQuery, Get_TransactionsQueryVariables>;
export const Get_TripsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GET_TRIPS"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"BookingQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBookingsForBuyer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"listingId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"listing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"district"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"landmark"}},{"kind":"Field","name":{"kind":"Name","value":"photos"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookingId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"order"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart_details"}},{"kind":"Field","name":{"kind":"Name","value":"cf_order_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"customer_details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer_id"}},{"kind":"Field","name":{"kind":"Name","value":"customer_name"}},{"kind":"Field","name":{"kind":"Name","value":"customer_email"}},{"kind":"Field","name":{"kind":"Name","value":"customer_phone"}},{"kind":"Field","name":{"kind":"Name","value":"customer_uid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"entity"}},{"kind":"Field","name":{"kind":"Name","value":"order_amount"}},{"kind":"Field","name":{"kind":"Name","value":"order_currency"}},{"kind":"Field","name":{"kind":"Name","value":"order_expiry_time"}},{"kind":"Field","name":{"kind":"Name","value":"order_id"}},{"kind":"Field","name":{"kind":"Name","value":"order_meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"return_url"}},{"kind":"Field","name":{"kind":"Name","value":"notify_url"}},{"kind":"Field","name":{"kind":"Name","value":"payment_methods"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order_note"}},{"kind":"Field","name":{"kind":"Name","value":"order_splits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendor_id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order_status"}},{"kind":"Field","name":{"kind":"Name","value":"order_tags"}},{"kind":"Field","name":{"kind":"Name","value":"payment_session_id"}},{"kind":"Field","name":{"kind":"Name","value":"terminal_data"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<Get_TripsQuery, Get_TripsQueryVariables>;
export const GetVendorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVendor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"VendorQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVendor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vendorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"bank"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account_number"}},{"kind":"Field","name":{"kind":"Name","value":"account_holder"}},{"kind":"Field","name":{"kind":"Name","value":"ifsc"}}]}},{"kind":"Field","name":{"kind":"Name","value":"kyc_details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account_type"}},{"kind":"Field","name":{"kind":"Name","value":"business_type"}},{"kind":"Field","name":{"kind":"Name","value":"pan"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vendor_id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"verify_account"}},{"kind":"Field","name":{"kind":"Name","value":"dashboard_access"}},{"kind":"Field","name":{"kind":"Name","value":"schedule_option"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settlement_schedule_message"}},{"kind":"Field","name":{"kind":"Name","value":"schedule_id"}},{"kind":"Field","name":{"kind":"Name","value":"merchant_default"}}]}},{"kind":"Field","name":{"kind":"Name","value":"related_docs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"doc_name"}},{"kind":"Field","name":{"kind":"Name","value":"doc_value"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"remarks"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetVendorQuery, GetVendorQueryVariables>;
export const Search_ListingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SEARCH_LISTINGS"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ListingQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchListings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vehicleType"},"value":{"kind":"EnumValue","value":"Bike"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basePrice"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOpen"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"allowedVehicles"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"district"}},{"kind":"Field","name":{"kind":"Name","value":"landmark"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"pphcy"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photos"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"plph"}},{"kind":"Field","name":{"kind":"Name","value":"pphbi"}},{"kind":"Field","name":{"kind":"Name","value":"pphcr"}}]}}]}}]}}]} as unknown as DocumentNode<Search_ListingsQuery, Search_ListingsQueryVariables>;
export const Get_ListingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GET_LISTINGS"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ListingQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getListings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowedVehicles"}},{"kind":"Field","name":{"kind":"Name","value":"basePrice"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"district"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOpen"}},{"kind":"Field","name":{"kind":"Name","value":"landmark"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pphbi"}},{"kind":"Field","name":{"kind":"Name","value":"pphcy"}},{"kind":"Field","name":{"kind":"Name","value":"pphcr"}},{"kind":"Field","name":{"kind":"Name","value":"plph"}},{"kind":"Field","name":{"kind":"Name","value":"photos"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<Get_ListingsQuery, Get_ListingsQueryVariables>;
export const Get_Completed_BookingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GET_COMPLETED_BOOKINGS"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"BookingQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBookingsForHost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"EnumValue","value":"Completed"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"listingId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"lockedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<Get_Completed_BookingsQuery, Get_Completed_BookingsQueryVariables>;
export const Get_Checkingout_BookingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GET_CHECKINGOUT_BOOKINGS"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"BookingQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBookingsForHost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"EnumValue","value":"OnGoing"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"listingId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"lockedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<Get_Checkingout_BookingsQuery, Get_Checkingout_BookingsQueryVariables>;
export const Get_TripDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GET_TRIP"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"BookingQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBookingsForBuyer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"listingId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"lockedAt"}},{"kind":"Field","name":{"kind":"Name","value":"ipFee"}},{"kind":"Field","name":{"kind":"Name","value":"basePrice"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"parkingPrice"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"listing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"district"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"landmark"}},{"kind":"Field","name":{"kind":"Name","value":"allowedVehicles"}},{"kind":"Field","name":{"kind":"Name","value":"basePrice"}},{"kind":"Field","name":{"kind":"Name","value":"pphbi"}},{"kind":"Field","name":{"kind":"Name","value":"pphcy"}},{"kind":"Field","name":{"kind":"Name","value":"pphcr"}},{"kind":"Field","name":{"kind":"Name","value":"plph"}},{"kind":"Field","name":{"kind":"Name","value":"photos"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOpen"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"emails"}},{"kind":"Field","name":{"kind":"Name","value":"timeJoined"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"kyc"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uidai"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"district"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"landmark"}},{"kind":"Field","name":{"kind":"Name","value":"ratings"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookingId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"order"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart_details"}},{"kind":"Field","name":{"kind":"Name","value":"cf_order_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"customer_details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer_id"}},{"kind":"Field","name":{"kind":"Name","value":"customer_name"}},{"kind":"Field","name":{"kind":"Name","value":"customer_email"}},{"kind":"Field","name":{"kind":"Name","value":"customer_phone"}},{"kind":"Field","name":{"kind":"Name","value":"customer_uid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"entity"}},{"kind":"Field","name":{"kind":"Name","value":"order_amount"}},{"kind":"Field","name":{"kind":"Name","value":"order_currency"}},{"kind":"Field","name":{"kind":"Name","value":"order_expiry_time"}},{"kind":"Field","name":{"kind":"Name","value":"order_id"}},{"kind":"Field","name":{"kind":"Name","value":"order_meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"return_url"}},{"kind":"Field","name":{"kind":"Name","value":"notify_url"}},{"kind":"Field","name":{"kind":"Name","value":"payment_methods"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order_note"}},{"kind":"Field","name":{"kind":"Name","value":"order_splits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendor_id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order_status"}},{"kind":"Field","name":{"kind":"Name","value":"order_tags"}},{"kind":"Field","name":{"kind":"Name","value":"payment_session_id"}},{"kind":"Field","name":{"kind":"Name","value":"terminal_data"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<Get_TripQuery, Get_TripQueryVariables>;