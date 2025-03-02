import { gql } from '../__generated__';

export const GET_EARNINGS_DASHBOARD = gql(`
query GetEarningsDashboard($userId: String!, $vendorId: String!) {
  VendorQuery {
    getEarningsDashboard(userId: $userId) {
      earnings {
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
      vendorBalance(vendorId: $vendorId) {
        vendor_id
        vendor_unsettled
      }
    }
  }
}
`);
