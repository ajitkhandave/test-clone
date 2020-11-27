package com.shutterfly.sbs.eni.reports.repositories.model;

public enum ENIReportsCategoryEnum {

  ONBOARDING_DASHBOARD_STANDARD_BROCHURES_BY_MONTH_REPORT("ONBOARDING DASHBOARD STD BROCHURES BY MONTH REPORT","standardBrochuresByMonthRepo"),
  ONBOARDING_DASHBOARD_WCB_BY_MONTH_REPORT("ONBOARDING DASHBOARD WCB BY MONTH REPORT","standardBrochuresByMonthRepo"),
  ONBOARDING_DASHBOARD_STANDARD_BROCHURES_BY_SEGMENT_REPORT("ONBOARDING DASHBOARD STD BROCHURES BY SEGMENT REPORT","standardBrochuresBySegmentRepo"),
  ONBOARDING_DASHBOARD_WCB_BY_SEGMENT_REPORT("ONBOARDING DASHBOARD WCB BY SEGMENT REPORT","standardBrochuresBySegmentRepo"),
  ONBOARDING_DASHBOARD_STANDARD_BROCHURES_BY_PRODUCT_REPORT("ONBOARDING DASHBOARD STD BROCHURES BY PRODUCT REPORT","standardBrochuresByProductRepo"),
  ONBOARDING_DASHBOARD_STANDARD_BROCHURES_BY_PROGRAM_REPORT("ONBOARDING DASHBOARD WCB BY PROGRAM REPORT","wcbByProgramRepo"),
  ONBOARDING_DASHBOARD_STANDARD_BROCHURES_BY_FUNDING_TYPE_REPORT("ONBOARDING DASHBOARD WCB BY FUNDING TYPE REPORT","wcbByFundingRepo"),
  ORDER_DETAILS_REPORT("ORDER DETAILS REPORT","orderDetailsRepo"),
  LINE_ITEM_DETAILS_REPORT("LINE ITEM DETAILS REPORT","lineItemDetailsRepo"),
  ALL_SAVERS_REPORTS_BY_MONTH("ALL SAVERS REPORT BY MONTH","standardBrochuresByMonthRepo"),
  ALL_SAVERS_REPORTS_BY_SEGMENT("ALL SAVERS REPORT BY SEGMENT","standardBrochuresBySegmentRepo"),
  ALL_SAVERS_REPORTS_BY_SKU("ALL SAVERS REPORT","allSaversRepo"),
  SHIPMENT_ORDERS_REPORT("SHIPMENT BY ORDERS REPORT","shipmentOrdersRepo"),
  SHIPMENT_ADDRESS_REPORT("SHIPMENT BY ORDERS ADDRESS REPORT","shipmentAddressRepo"),
  MEMBER_ENGAGEMENT_REPORT("MEMBER ENGAGEMENT REPORT","allSaversRepo"),
  MEMBER_ENGAGEMENT_REPORT_BY_MONTH("MEMBER ENGAGEMENT REPORT BY YEAR","standardBrochuresByMonthRepo"),
  MEMBER_ENGAGEMENT_REPORT_BY_SEGMENT("MEMBER ENGAGEMENT REPORT BY SEGMENT","standardBrochuresBySegmentRepo"),
  INVOICING_SHIPPED_LINE_ITEM_LEVEL_REPORT("INVOICING LINE ITEM LEVEL SHIPPED REPORT","invoicingLineItemRepo"),
  INVOICING_SHIPPED_ORDER_LEVEL_REPORT("INVOICING ORDER LEVEL SHIPPED REPORT","invoicingOrderLevelRepo"),
  INVOICING_PRICING_ERROR_REPORT("INVOICING PRICING ERROR REPORT","pricingErrorRepo"),
  INVOICING_MISSING_SKU_REPORT("INVOICING MISSING SKU REPORT","missingSkuRepo"),
  INVOICING_ITEM_COUNT_KIT_REPORT("INVOICING ITEM COUNT KIT REPORT","itemCountKitRepo"),
  INVOICING_ORDERS_LINE_ITEM_LEVEL_REPORT("INVOICING ORDERS LINE ITEM LEVEL REPORT","invoicingLineItemRepo"),
  INVOICING_ORDERS_LEVEL_REPORT("INVOICING ORDERS LEVEL REPORT","invoicingOrderLevelRepo"),
  INVOICING_SKU_INFORMATION_REPORT("INVOICING SKU INFORMATION REPORT","invoicingSkuInformationRepo"),
  INVOICING_FORM_FACTOR_TOTAL_REPORT("INVOICING FORM FACTOR TOTAL REPORT","invoicingFormFactorRepo"),
  MPT_REPORT_ORDER_COUNTS_PER_DAY("MPT_REPORT_ORDER_COUNTS_PER_DAY","mptRepoPerDay"),
  MPT__REPORT_ORDER_COUNTS_BY_STATUS("MPT__REPORT_ORDER_COUNTS_BY_STATUS","mptRepoByStatus"),
  MPT__REPORT_ORDER_COUNTS_BY_BUSINESS_SEGMENT("MPT__REPORT_ORDER_COUNTS_BY_BUSINESS_SEGMENT","mptRepoBusinessSegment"),
  MPT__REPORT_ORDER_COUNTS_BY_FLYER_COUNTS("MPT__REPORT_ORDER_COUNTS_BY_FLYER_COUNTS","mptRepoByFlyerCounts"),
  MPT__REPORT_ORDER_COUNTS_BY_KIT("MPT__REPORT_ORDER_COUNTS_BY_KIT","mptRepoByKit"),
  MPT__REPORT_ORDER_COUNTS_BY_USERS("MPT__REPORT_ORDER_COUNTS_BY_USERS","mptRepoByUsers"),
  MPT__REPORT_ORDER_COUNTS_TOTALS("MPT__REPORT_ORDER_COUNTS_TOTALS","mptRepoTotals");

  String name;
  String repository;

  ENIReportsCategoryEnum(String name, String repository) {
    this.name=  name;
    this.repository = repository;

  }

  public String getRepository() {
    return this.repository;
  }

  public String getName() {
    return this.name;
  }

}
