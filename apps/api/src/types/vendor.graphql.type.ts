import { GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

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

export const VendorBalance = new GraphQLObjectType({
    name: "VendorBalance",
    fields: {
        vendor_id: { type: GraphQLString },
        vendor_unsettled: { type: GraphQLFloat }
    }
})