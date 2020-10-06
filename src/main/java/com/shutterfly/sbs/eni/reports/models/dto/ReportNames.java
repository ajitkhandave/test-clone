package com.shutterfly.sbs.eni.reports.models.dto;

public enum ReportNames {
  POP_ACTIVE_PRODUCTS("POP ACTIVE PRODUCTS REPORT"),
  PLATFORM_ORDER_RECORDS("PLATFORM ORDER REPORT");

  String name;

  ReportNames(String name) {
    this.name=  name;

  }

  public String getName() {
    return this.name;
  }
}
