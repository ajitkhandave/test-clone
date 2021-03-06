package com.shutterfly.sbs.eni.reports.repositories.model;

public enum ReportNames {
  POP_ACTIVE_PRODUCTS("POP ACTIVE PRODUCTS REPORT", "skuItemRepo"),
  STATUS_ALERT_REPORT("STATUS ALERT REPORT", "platformOrderRepo"),
  MONTHLY_VOLUME_REPORT("MONTHLY VOLUME REPORT", "monthlyVolumeRepo"),
  ORDER_STATUS_REPORT("ORDER STATUS REPORT", "platformOrderRepo"),
  OE_VP_DATA_REPORT("OE VP DATA REPORT","oeVpDataRepo");

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
