package com.shutterfly.sbs.eni.reports.controllers;

import java.util.concurrent.TimeUnit;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.CacheControl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UIPathController {

  @RequestMapping(value = {"/reports"})
  public String reportsIndex(HttpServletResponse response) {
    String headerValue = CacheControl.maxAge(3600, TimeUnit.SECONDS).getHeaderValue();
    response.addHeader("Cache-Control", headerValue);
    return "/reports/index";
  }
}
