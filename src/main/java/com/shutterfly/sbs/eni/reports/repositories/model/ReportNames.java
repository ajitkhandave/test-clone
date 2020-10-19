package com.shutterfly.sbs.eni.reports.repositories.model;

public enum ReportNames {
  POP_ACTIVE_PRODUCTS("POP ACTIVE PRODUCTS REPORT", "skuItemRepo"),
  STATUS_ALERT_REPORT("STATUS ALERT REPORT", "statusRepo"),
  MONTHLY_VOLUME_REPORT("MONTHLY VOLUME REPORT", "monthlyVolumeRepo"),
  ORDER_STATUS_REPORT("ORDER STATUS REPORT", "statusRepo"),
  ALL_SAVERS_REPORT("AorderorderLL SAVERS REPORT","allSaversRepo"),
  ORDER_DETAILS_REPORT("ORDER DETAILS REPORT","orderDetailsRepo"),
  MEMBER_ENGAGEMENT_REPORT("MEMBER ENGAGEMENT REPORT","allSaversRepo"),
  ONLINE_DASHBOARD_STANDARD_BROCHURES_BY_MONTH_REPORT("ONLINE DASHBOARD STD BROCHURES BY MONTH REPORT","standardBrochuresRepo"),
  ONLINE_DASHBOARD_STANDARD_BROCHURES_BY_SEGMENT_REPORT("ONLINE DASHBOARD STD BROCHURES BY SEGMENT REPORT","standardBrochuresRepo"),
  ONLINE_DASHBOARD_STANDARD_BROCHURES_BY_PRODUCT_REPORT("ONLINE DASHBOARD STD BROCHURES BY PRODUCT REPORT","standardBrochuresRepo");

  String name;
  String repository;

  ReportNames(String name, String repository) {
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
