import { gql } from "../__generated__";

export const GET_EARNINGS_DASHBOARD = gql(`
query GetEarningsDashboard($vendorId: String, $userId: String) {
  BookingQuery {
    getEarningsDashboard {
      vendorBalance(vendorId: $vendorId) {
        vendor_id
        vendor_unsettled
      }
      earnings(userId: $userId) {
        currentMonth {
          totalBookings
          totalRevenue
          totalNetProfit
          avgBookingValue
        }
        previousMonth {
          totalBookings
          totalRevenue
          totalNetProfit
          avgBookingValue
        }
        netPL {
          totalBookingsPLPercent
          totalRevenuePLPercent
          totalNetProfitPLPercent
          avgBookingValuePLPercent
        }
      }
    }
  }
}
`)