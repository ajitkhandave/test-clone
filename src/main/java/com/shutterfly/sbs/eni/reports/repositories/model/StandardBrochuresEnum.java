package com.shutterfly.sbs.eni.reports.repositories.model;

public enum StandardBrochuresEnum {

  ONLINE_DASHBOARD_STANDARD_BROCHURES_BY_MONTH_REPORT("ONLINE DASHBOARD STD BROCHURES BY MONTH REPORT","standardBrochuresByMonthRepo"),
  ONLINE_DASHBOARD_STANDARD_BROCHURES_BY_SEGMENT_REPORT("ONLINE DASHBOARD STD BROCHURES BY SEGMENT REPORT","standardBrochuresBySegmentRepo"),
  ONLINE_DASHBOARD_STANDARD_BROCHURES_BY_PRODUCT_REPORT("ONLINE DASHBOARD STD BROCHURES BY PRODUCT REPORT","standardBrochuresByProductRepo"),
  ORDER_DETAILS_REPORT("ORDER DETAILS REPORT","orderDetailsRepo");

  String name;
  String repository;

  StandardBrochuresEnum(String name, String repository) {
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
