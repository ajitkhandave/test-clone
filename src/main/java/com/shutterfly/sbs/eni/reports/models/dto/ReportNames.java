package com.shutterfly.sbs.eni.reports.models.dto;

public enum ReportNames {
  POP_ACTIVE_PRODUCTS("POP ACTIVE PRODUCTS REPORT", "skuItemRepo"),
  STATUS_ALERT_REPORT("STATUS ALERT REPORT", "platformCorrelationRepo"),
  DEMO_REPORT("DEMO REPORT","demoRepo");

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
