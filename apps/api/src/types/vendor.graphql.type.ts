import { GraphQLBoolean, GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const VendorBank = new GraphQLObjectType({
    name: "VendorBank",
    fields: {
        account_number: { type: GraphQLString },
        account_holder: { type: GraphQLString },
        ifsc: { type: GraphQLString }
    }
})

export const VendorKYC = new GraphQLObjectType({
    name: "VendorKYC",
    fields: {
        account_type: { type: GraphQLString },
        business_type: { type: GraphQLString },
        pan: { type: GraphQLString }
    }
})

export const VendorSchedule = new GraphQLObjectType({
    name: "VendorSchedule",
    fields: {
        settlement_schedule_message: { type: GraphQLString },
        schedule_id: { type: GraphQLInt },
        merchant_default: { type: GraphQLBoolean }
    }
})

export const VendorDocuments = new GraphQLObjectType({
    name: "VendorDocuments",
    fields: {
        doc_name: { type: GraphQLString },
        doc_value: { type: GraphQLString },
        status: { type: GraphQLString },
        remarks: { type: GraphQLString },
    }
})

export const VendorType = new GraphQLObjectType({
    name: "Vendor",
    fields: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        bank: { type: VendorBank },
        kyc_details: { type: VendorKYC },
        vendor_id: { type: GraphQLString },
        status: { type: GraphQLString },
        verify_account: { type: GraphQLBoolean },
        dashboard_access: { type: GraphQLBoolean },
        schedule_option: { type: VendorSchedule },
        related_docs: { type: new GraphQLList(VendorDocuments) }
    }
})

export const VendorBalanceType = new GraphQLObjectType({
    name: "VendorBalance",
    fields: {
        vendor_id: { type: new GraphQLNonNull(GraphQLString) },
        vendor_unsettled: { type: new GraphQLNonNull(GraphQLString) }
    }
})

export const EarningsType = new GraphQLObjectType({
    name: "Earnings",
    fields: {
        currentMonth: {
            type: new GraphQLObjectType({
                name: "CurrentMonth",
                fields: {
                    totalBookings: { type: GraphQLInt },
                    totalRevenue: { type: GraphQLFloat },
                    totalNetProfit: { type: GraphQLFloat },
                    avgBookingValue: { type: GraphQLFloat },
                },
            }),
        },
        previousMonth: {
            type: new GraphQLObjectType({
                name: "PreviousMonth",
                fields: {
                    totalBookings: { type: GraphQLInt },
                    totalRevenue: { type: GraphQLFloat },
                    totalNetProfit: { type: GraphQLFloat },
                    avgBookingValue: { type: GraphQLFloat },
                },
            }),
        },
        netPL: {
            type: new GraphQLObjectType({
                name: "NetPL",
                fields: {
                    totalBookingsPLPercent: { type: GraphQLFloat },
                    totalRevenuePLPercent: { type: GraphQLFloat },
                    totalNetProfitPLPercent: { type: GraphQLFloat },
                    avgBookingValuePLPercent: { type: GraphQLFloat },
                },
            }),
        },

    },
})

export const EntityTypeEnum = new GraphQLEnumType({
    name: "EntityType",
    values: {
        "TRANSACTION": { value: "transaction" },
        "VENDOR_COMMISION": { value: "vendor_comission" }
    }
})

export const VendorOrderSplit = new GraphQLObjectType({
    name: "VendorOrderSplit",
    fields: () => ({
        split: {
            type: new GraphQLList(new GraphQLObjectType({
                name: "VendorSplit",
                fields: {
                    merchant_vendor_id: { type: GraphQLString },
                    percentage: { type: GraphQLInt },
                    tags: { type: GraphQLString },
                }
            }))
        }
    }),
})

export const ReconDataType = new GraphQLObjectType({
    name: "ReconData",
    fields: {
        amount: { type: (GraphQLFloat) },
        merchant_order_id: { type: (GraphQLString) },
        tx_time: { type: GraphQLString },
        settled: { type: GraphQLString },
        entity_id: { type: GraphQLString },
        currency: { type: GraphQLString },
        sale_type: { type: GraphQLString },
        customer_email: { type: GraphQLString },
        customer_phone: { type: GraphQLString },
        added_on: { type: GraphQLString },
        entity_type: { type: GraphQLString },
        settlement_eligibility_time: { type: GraphQLString },
        merchant_settlement_utr: { type: GraphQLString },
        payment_utr: { type: GraphQLString },
        merchant_vendor_commission: { type: GraphQLString },
        split_service_charge: { type: GraphQLString },
        split_service_tax: { type: GraphQLString },
        pg_service_tax: { type: GraphQLString },
        pg_service_charge: { type: GraphQLString },
        pg_charge_postpaid: { type: GraphQLString },
        merchant_settlement_id: { type: GraphQLString },
        tags: { type: GraphQLString },
        settlement_initiated_on: { type: GraphQLString },
        settlement_time: { type: GraphQLString },
        eligible_split_balance: { type: GraphQLString },
        order_splits: {
            type: new GraphQLList(VendorOrderSplit)
        },
        merchant_vendor_id: { type: GraphQLString },
        vendor_settlement_time: { type: GraphQLString },
        vendor_settlement_initiated_on: { type: GraphQLString },
        vendor_settlement_eligibility_time: { type: GraphQLString },
        vendor_settlement_id: { type: GraphQLString },
        vendor_commission: { type: GraphQLString },
        vendor_pg_service_charge: { type: GraphQLString },
        vendor_pg_service_tax: { type: GraphQLString },
        status: { type: GraphQLString },
    }
})