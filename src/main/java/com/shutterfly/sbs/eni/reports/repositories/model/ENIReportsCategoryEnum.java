package com.shutterfly.sbs.eni.reports.repositories.model;

public enum ENIReportsCategoryEnum {

  ONBOARDING_DASHBOARD_STANDARD_BROCHURES_BY_MONTH_REPORT("ONBOARDING DASHBOARD STD BROCHURES BY MONTH REPORT","standardBrochuresByMonthRepo"),
  ONBOARDING_DASHBOARD_STANDARD_BROCHURES_BY_SEGMENT_REPORT("ONBOARDING DASHBOARD STD BROCHURES BY SEGMENT REPORT","standardBrochuresBySegmentRepo"),
  ONBOARDING_DASHBOARD_STANDARD_BROCHURES_BY_PRODUCT_REPORT("ONBOARDING DASHBOARD STD BROCHURES BY PRODUCT REPORT","standardBrochuresByProductRepo"),
  ONBOARDING_DASHBOARD_STANDARD_BROCHURES_BY_PROGRAM_REPORT("ONBOARDING DASHBOARD WCB BY PROGRAM REPORT","wcbByProgramRepo"),
  ONBOARDING_DASHBOARD_STANDARD_BROCHURES_BY_FUNDING_TYPE_REPORT("ONBOARDING DASHBOARD WCB BY FUNDING TYPE REPORT","wcbByFundingRepo"),
  ORDER_DETAILS_REPORT("ORDER DETAILS REPORT","orderDetailsRepo"),
  ALL_SAVERS_REPORTS_BY_MONTH("ALL SAVERS REPORT BY MONTH","standardBrochuresByMonthRepo"),
  ALL_SAVERS_REPORTS_BY_SEGMENT("ALL SAVERS REPORT BY SEGMENT","standardBrochuresBySegmentRepo"),
  ALL_SAVERS_REPORTS_BY_SKU("ALL SAVERS REPORT","allSaversRepo"),
  SHIPMENT_ORDERS_REPORT("SHIPMENT BY ORDERS REPORT","shipmentOrdersRepo"),
  SHIPMENT_ADDRESS_REPORT("SHIPMENT BY ORDERS ADDRESS REPORT","shipmentAddressRepo");

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
