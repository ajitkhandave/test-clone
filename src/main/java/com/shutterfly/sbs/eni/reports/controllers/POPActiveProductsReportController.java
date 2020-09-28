package com.shutterfly.sbs.eni.reports.controllers;

import com.shutterfly.sbs.eni.reports.repositories.SkuItemRepo;
import com.shutterfly.sbs.eni.reports.repositories.model.SkuItem;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.List;
import java.util.concurrent.TimeUnit;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.http.CacheControl;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/eni")
@RequiredArgsConstructor
public class POPActiveProductsReportController {

  private final SkuItemRepo skuItemRepo;

  @ApiOperation(value = "Fetch POP Active Products Report")
  @ApiResponses(value = {
      @ApiResponse(code = 201, message = "Created", response = SkuItem.class),
      @ApiResponse(code = 404, message = "Not Found"),
      @ApiResponse(code = 500, message = "Server Failure")})
  @RequestMapping(value = {"/pop-active/products"})
  public List<SkuItem> home(HttpServletResponse response) {

    List<SkuItem> activeSkuList = skuItemRepo.findAll();
    return activeSkuList;
  }

}
