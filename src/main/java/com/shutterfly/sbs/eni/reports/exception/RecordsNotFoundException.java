package com.shutterfly.sbs.eni.reports.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "No data found for report")
public class RecordsNotFoundException extends Exception {

  public RecordsNotFoundException(String errorMessage) {
    super(errorMessage);
  }
}
