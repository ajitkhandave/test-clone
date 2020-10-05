package com.shutterfly.sbs.eni.reports.models.dto;

import lombok.Getter;

@Getter
public enum ErrorCodes {
  NO_QUERY_FOR_REPORT("R0001", "No Query Found for Report"),
  NO_REPORT_DATA_FOUND("R0002", "No Report Data Found"),
  NO_REPORT_FOUND("R0003", "No Report found for the string passed");

  String code;
  String message;


  ErrorCodes(String code, String message){
    this.code = code;
    this.message = message;
  }
}
