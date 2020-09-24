package com.shutterfly.sbs.eni.reports.controllers;

import java.util.concurrent.TimeUnit;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.CacheControl;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/eni")
public class UIPathController {

  @RequestMapping(value = {"/reports"})
  public String home(HttpServletResponse response) {
    return "Hello";
  }

}
