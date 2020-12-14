package com.shutterfly.sbs.eni.reports.controllers;


import com.shutterfly.sbs.eni.reports.exception.RecordsNotFoundException;
import com.shutterfly.sbs.eni.reports.repositories.model.ReportNames;
import com.shutterfly.sbs.eni.reports.repositories.model.ENIReportsCategoryEnum;
import com.shutterfly.sbs.eni.reports.repositories.model.ShipmentOrders;
import com.shutterfly.sbs.eni.reports.services.ReportService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/eni")
@AllArgsConstructor
public class ReportController {


  private final ReportService reportService;


  @ApiOperation(value = "ENI Reports Data", authorizations = { @Authorization(value="Authorization") })
  @GetMapping(path = "/fetchReport/{reportName}", produces = "application/json")
  public List<Object> fetchReports(@PathVariable ReportNames reportName) {
    try {
        List<String> queries = reportService.getQueriesForReport(reportName.getName());
        return reportService.getAllActiveProducts(queries, reportName.getRepository(), null, null);
    } catch(RecordsNotFoundException ex) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
    } catch(Exception ex) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
    }
  }

  @ApiOperation(value = "ENI Shipment Orders Reports Data", authorizations = { @Authorization(value="Authorization") })
  @GetMapping(path = "/fetchReport/shipmentOrders", produces = "application/json")
  public List<ShipmentOrders> fetchShipmentOrdersReports() {
    List<ShipmentOrders> shipmentOrdersReportList = null;
    try {
      List<String> queries = reportService.getQueriesForReport(ENIReportsCategoryEnum.SHIPMENT_ORDERS_REPORT.getName());
      List<Object> shipmentOrders = reportService.getAllActiveProducts(queries, ENIReportsCategoryEnum.SHIPMENT_ORDERS_REPORT.getRepository(), null, null);

      List<String> addressQuery = reportService.getQueriesForReport(ENIReportsCategoryEnum.SHIPMENT_ADDRESS_REPORT.getName());
      List<Object> shipmentAddresses = reportService.getAllActiveProducts(addressQuery, ENIReportsCategoryEnum.SHIPMENT_ADDRESS_REPORT.getRepository(), null, null);

      shipmentOrdersReportList = reportService.mergeAddressesIntoShipmentOrders(shipmentOrders, shipmentAddresses);

    } catch(RecordsNotFoundException ex) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
    } catch(Exception ex) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
    }
    return shipmentOrdersReportList;
  }

  @ApiOperation(value = "ENI Order Details Reports Data", authorizations = { @Authorization(value="Authorization") })
  @GetMapping(path = "/fetchReport/orderDetails", produces = "application/json")
  public List<Object> fetchReports(@RequestParam(value = "startDate", required = false) String startDate, @RequestParam(value = "endDate", required = false) String  endDate ) {
    try {
      List<String> queries = reportService.getQueriesForReport(ENIReportsCategoryEnum.ORDER_DETAILS_REPORT.getName());
      return reportService.getAllActiveProducts(queries, ENIReportsCategoryEnum.ORDER_DETAILS_REPORT.getRepository(), startDate, endDate);
    } catch(RecordsNotFoundException ex) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
    } catch(Exception ex) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
    }
  }

  @ApiOperation(value = "ENI Line Item Details Reports Data", authorizations = { @Authorization(value="Authorization") })
  @GetMapping(path = "/fetchReport/lineItemDetails", produces = "application/json")
  public List<Object> fetchLineItemReports(@RequestParam(value = "startDate", required = false) String startDate, @RequestParam(value = "endDate", required = false) String  endDate ) {
    try {
      List<String> queries = reportService.getQueriesForReport(ENIReportsCategoryEnum.LINE_ITEM_DETAILS_REPORT.getName());
      return reportService.getAllActiveProducts(queries, ENIReportsCategoryEnum.LINE_ITEM_DETAILS_REPORT.getRepository(), startDate, endDate);
    } catch(RecordsNotFoundException ex) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
    } catch(Exception ex) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
    }
  }

  @ApiOperation(value = "ENI Onboarding Dashbaord Reports Data", authorizations = { @Authorization(value="Authorization") })
  @GetMapping(path = "/fetchReport/onboardingDashboard", produces = "application/json")
  public Map<String, List<Object>> fetchOnbaordingDashboardReport() {
    Map<String, List<Object>> standardBrochuresReport = new HashMap<String, List<Object>>();
    try {
      List<String> queries = reportService.getQueriesForReport(ENIReportsCategoryEnum.ONBOARDING_DASHBOARD_STANDARD_BROCHURES_BY_MONTH_REPORT.getName());
      List<Object> reportResult = reportService.getAllActiveProducts(queries, ENIReportsCategoryEnum.ONBOARDING_DASHBOARD_STANDARD_BROCHURES_BY_MONTH_REPORT.getRepository(), null, null);
      standardBrochuresReport.put("STD_BY_MONTH", reportResult);

      queries = reportService.getQueriesForReport(ENIReportsCategoryEnum.ONBOARDING_DASHBOARD_STANDARD_BROCHURES_BY_SEGMENT_REPORT.getName());
      reportResult = reportService.getAllActiveProducts(queries, ENIReportsCategoryEnum.ONBOARDING_DASHBOARD_STANDARD_BROCHURES_BY_SEGMENT_REPORT.getRepository(), null, null);
      standardBrochuresReport.put("STD_BY_SEGMENT", reportResult);

      queries = reportService.getQueriesForReport(ENIReportsCategoryEnum.ONBOARDING_DASHBOARD_STANDARD_BROCHURES_BY_PRODUCT_REPORT.getName());
      reportResult = reportService.getAllActiveProducts(queries, ENIReportsCategoryEnum.ONBOARDING_DASHBOARD_STANDARD_BROCHURES_BY_PRODUCT_REPORT.getRepository(), null, null);
      standardBrochuresReport.put("BY_PRODUCT", reportResult);

      queries = reportService.getQueriesForReport(ENIReportsCategoryEnum.ONBOARDING_DASHBOARD_STANDARD_BROCHURES_BY_FUNDING_TYPE_REPORT.getName());
      reportResult = reportService.getAllActiveProducts(queries, ENIReportsCategoryEnum.ONBOARDING_DASHBOARD_STANDARD_BROCHURES_BY_FUNDING_TYPE_REPORT.getRepository(), null, null);
      standardBrochuresReport.put("BY_FUNDING_TYPE", reportResult);

      queries = reportService.getQueriesForReport(ENIReportsCategoryEnum.ONBOARDING_DASHBOARD_STANDARD_BROCHURES_BY_PROGRAM_REPORT.getName());
      reportResult = reportService.getAllActiveProducts(queries, ENIReportsCategoryEnum.ONBOARDING_DASHBOARD_STANDARD_BROCHURES_BY_PROGRAM_REPORT.getRepository(), null, null);
      standardBrochuresReport.put("BY_PROGRAM", reportResult);

      queries = reportService.getQueriesForReport(ENIReportsCategoryEnum.ONBOARDING_DASHBOARD_WCB_BY_MONTH_REPORT.getName());
      reportResult = reportService.getAllActiveProducts(queries, ENIReportsCategoryEnum.ONBOARDING_DASHBOARD_WCB_BY_MONTH_REPORT.getRepository(), null, null);
      standardBrochuresReport.put("WCB_BY_MONTH", reportResult);

      queries = reportService.getQueriesForReport(ENIReportsCategoryEnum.ONBOARDING_DASHBOARD_WCB_BY_SEGMENT_REPORT.getName());
      reportResult = reportService.getAllActiveProducts(queries, ENIReportsCategoryEnum.ONBOARDING_DASHBOARD_WCB_BY_SEGMENT_REPORT.getRepository(), null, null);
      standardBrochuresReport.put("WCB_BY_SEGMENT", reportResult);

      queries = reportService.getQueriesForReport(ENIReportsCategoryEnum.ONBOARDING_DASHBOARD_ORDERS_TRANSLATED_REPORT.getName());
      reportResult = reportService.getAllActiveProducts(queries, ENIReportsCategoryEnum.ONBOARDING_DASHBOARD_ORDERS_TRANSLATED_REPORT.getRepository(), null, null);
      standardBrochuresReport.put("BY_ORDERS_TRANSLATED", reportResult);


    } catch(RecordsNotFoundException ex) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
    } catch(Exception ex) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
    }
    return standardBrochuresReport;
  }

  @ApiOperation(value = "All Savers Reports Data", authorizations = { @Authorization(value="Authorization") })
  @GetMapping(path = "/fetchReport/allSaversReports", produces = "application/json")
  public Map<String, List<Object>> fetchAllSaversReport() {
    Map<String, List<Object>> standardBrochuresReport = new HashMap<String, List<Object>>();
    try {
      List<String> queries = reportService.getQueriesForReport(ENIReportsCategoryEnum.ALL_SAVERS_REPORTS_BY_MONTH.getName());
      List<Object> reportResult = reportService.getAllActiveProducts(queries, ENIReportsCategoryEnum.ALL_SAVERS_REPORTS_BY_MONTH.getRepository(), null, null);
      standardBrochuresReport.put("BY_MONTH", reportResult);

      queries = reportService.getQueriesForReport(ENIReportsCategoryEnum.ALL_SAVERS_REPORTS_BY_SEGMENT.getName());
      reportResult = reportService.getAllActiveProducts(queries, ENIReportsCategoryEnum.ALL_SAVERS_REPORTS_BY_SEGMENT.getRepository(), null, null);
      standardBrochuresReport.put("BY_SEGMENT", reportResult);

      queries = reportService.getQueriesForReport(ENIReportsCategoryEnum.ALL_SAVERS_REPORTS_BY_SKU.getName());
      reportResult = reportService.getAllActiveProducts(queries, ENIReportsCategoryEnum.ALL_SAVERS_REPORTS_BY_SKU.getRepository(), null, null);
      standardBrochuresReport.put("BY_SKU", reportResult);

    } catch(RecordsNotFoundException ex) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
    } catch(Exception ex) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
    }
    return standardBrochuresReport;
  }

  @ApiOperation(value = "Member Engagement Reports Data", authorizations = { @Authorization(value="Authorization") })
  @GetMapping(path = "/fetchReport/memberEngagementReports", produces = "application/json")
  public Map<String, List<Object>> fetchMemberEngagementReport() {
    Map<String, List<Object>> standardBrochuresReport = new HashMap<String, List<Object>>();
    try {
      List<String> queries = reportService.getQueriesForReport(ENIReportsCategoryEnum.MEMBER_ENGAGEMENT_REPORT_BY_MONTH.getName());
      List<Object> reportResult = reportService.getAllActiveProducts(queries, ENIReportsCategoryEnum.MEMBER_ENGAGEMENT_REPORT_BY_MONTH.getRepository(), null, null);
      standardBrochuresReport.put("BY_MONTH", reportResult);

      queries = reportService.getQueriesForReport(ENIReportsCategoryEnum.MEMBER_ENGAGEMENT_REPORT_BY_SEGMENT.getName());
      reportResult = reportService.getAllActiveProducts(queries, ENIReportsCategoryEnum.MEMBER_ENGAGEMENT_REPORT_BY_SEGMENT.getRepository(), null, null);
      standardBrochuresReport.put("BY_SEGMENT", reportResult);

      queries = reportService.getQueriesForReport(ENIReportsCategoryEnum.MEMBER_ENGAGEMENT_REPORT.getName());
      reportResult = reportService.getAllActiveProducts(queries, ENIReportsCategoryEnum.MEMBER_ENGAGEMENT_REPORT.getRepository(), null, null);
      standardBrochuresReport.put("BY_SKU", reportResult);

    } catch(RecordsNotFoundException ex) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
    } catch(Exception ex) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
    }
    return standardBrochuresReport;
  }


  @ApiOperation(value = "Invoicing Pricing Error Report Data", authorizations = { @Authorization(value="Authorization") })
  @GetMapping(path = "/fetchReport/invoicingReports/pricingError", produces = "application/json")
  public List<Object> fetchInvoicingPricingReport() {
    List<Object> reportResult;
    try {
      List<String> queries = reportService.getQueriesForReport(ENIReportsCategoryEnum.INVOICING_PRICING_ERROR_REPORT.getName());
      reportResult = reportService.getAllActiveProducts(queries, ENIReportsCategoryEnum.INVOICING_PRICING_ERROR_REPORT.getRepository(), null, null);

    } catch(RecordsNotFoundException ex) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
    } catch(Exception ex) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
    }
    return reportResult;
  }

  @ApiOperation(value = "Invoicing Pricing Error Report Data", authorizations = { @Authorization(value="Authorization") })
  @GetMapping(path = "/fetchReport/invoicingReports/missingSku", produces = "application/json")
  public List<Object> fetchInvoicingMissingSkuReport() {
    List<Object> reportResult;
    try {
      List<String> queries = reportService.getQueriesForReport(ENIReportsCategoryEnum.INVOICING_MISSING_SKU_REPORT.getName());
      reportResult = reportService.getAllActiveProducts(queries, ENIReportsCategoryEnum.INVOICING_MISSING_SKU_REPORT.getRepository(), null, null);

    } catch(RecordsNotFoundException ex) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
    } catch(Exception ex) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
    }
    return reportResult;
  }
  @ApiOperation(value = "Invoicing Order Details Report Data", authorizations = { @Authorization(value="Authorization") })
  @GetMapping(path = "/fetchReport/invoicingReports/orderDetails", produces = "application/json")
  public List<Object> fetchInvoicingOrderDetailsReport(@RequestParam(value = "startDate", required = true) String startDate, @RequestParam(value = "endDate", required = true) String  endDate ) {
    List<Object> reportResult;
    try {
      List<String> queries = reportService.getQueriesForReport(ENIReportsCategoryEnum.INVOICING_ORDERS_LEVEL_REPORT.getName());
      reportResult = reportService.getAllActiveProducts(queries, ENIReportsCategoryEnum.INVOICING_ORDERS_LEVEL_REPORT.getRepository(), startDate, endDate);

    } catch(RecordsNotFoundException ex) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
    } catch(Exception ex) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
    }
    return reportResult;
  }

  @ApiOperation(value = "Invoicing Line Item Details Report Data", authorizations = { @Authorization(value="Authorization") })
  @GetMapping(path = "/fetchReport/invoicingReports/lineItemDetails", produces = "application/json")
  public List<Object> fetchInvoicingLineItemDetailsReport(@RequestParam(value = "startDate", required = true) String startDate, @RequestParam(value = "endDate", required = true) String  endDate) {
    List<Object> reportResult;
    try {
      List<String> queries = reportService.getQueriesForReport(ENIReportsCategoryEnum.INVOICING_ORDERS_LINE_ITEM_LEVEL_REPORT.getName());
      reportResult = reportService.getAllActiveProducts(queries, ENIReportsCategoryEnum.INVOICING_ORDERS_LINE_ITEM_LEVEL_REPORT.getRepository(), startDate, endDate);

    } catch(RecordsNotFoundException ex) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
    } catch(Exception ex) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
    }
    return reportResult;
  }

  @ApiOperation(value = "Invoicing Shipped Order Details Data", authorizations = { @Authorization(value="Authorization") })
  @GetMapping(path = "/fetchReport/invoicingReports/shippedOrderDetails", produces = "application/json")
  public List<Object> fetchInvoicingShippedOrderDetailsReport(@RequestParam(value = "startDate", required = true) String startDate, @RequestParam(value = "endDate", required = true) String  endDate) {
    List<Object> reportResult;
    try {
      List<String> queries = reportService.getQueriesForReport(ENIReportsCategoryEnum.INVOICING_SHIPPED_ORDER_LEVEL_REPORT.getName());
      reportResult = reportService.getAllActiveProducts(queries, ENIReportsCategoryEnum.INVOICING_SHIPPED_ORDER_LEVEL_REPORT.getRepository(), startDate, endDate);

    } catch(RecordsNotFoundException ex) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
    } catch(Exception ex) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
    }
    return reportResult;
  }

  @ApiOperation(value = "Invoicing shipped Line Item Details Data", authorizations = { @Authorization(value="Authorization") })
  @GetMapping(path = "/fetchReport/invoicingReports/shippedLineItemDetails", produces = "application/json")
  public List<Object> fetchInvoicingShippedLineItemReport(@RequestParam(value = "startDate", required = true) String startDate, @RequestParam(value = "endDate", required = true) String  endDate) {
    List<Object> reportResult;
    try {
      List<String> queries = reportService.getQueriesForReport(ENIReportsCategoryEnum.INVOICING_SHIPPED_LINE_ITEM_LEVEL_REPORT.getName());
      reportResult = reportService.getAllActiveProducts(queries, ENIReportsCategoryEnum.INVOICING_SHIPPED_LINE_ITEM_LEVEL_REPORT.getRepository(), startDate, endDate);

    } catch(RecordsNotFoundException ex) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
    } catch(Exception ex) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
    }
    return reportResult;
  }

  @ApiOperation(value = "Invoicing sku information Report Data", authorizations = { @Authorization(value="Authorization") })
  @GetMapping(path = "/fetchReport/invoicingReports/skuInformation", produces = "application/json")
  public List<Object> fetchInvoicingSkuInformationReport(@RequestParam(value = "startDate", required = true) String startDate, @RequestParam(value = "endDate", required = true) String  endDate) {
    List<Object> reportResult;
    try {
      List<String> queries = reportService.getQueriesForReport(ENIReportsCategoryEnum.INVOICING_SKU_INFORMATION_REPORT.getName());
      reportResult = reportService.getAllActiveProducts(queries, ENIReportsCategoryEnum.INVOICING_SKU_INFORMATION_REPORT.getRepository(), startDate, endDate);

    } catch(RecordsNotFoundException ex) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
    } catch(Exception ex) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
    }
    return reportResult;
  }

  @ApiOperation(value = "Invoicing Form Factor Totals Report Data", authorizations = { @Authorization(value="Authorization") })
  @GetMapping(path = "/fetchReport/invoicingReports/formFactorTotals", produces = "application/json")
  public List<Object> fetchInvoicingFormFactorTotals(@RequestParam(value = "startDate", required = true) String startDate, @RequestParam(value = "endDate", required = true) String  endDate) {
    List<Object> reportResult;
    try {
      List<String> queries = reportService.getQueriesForReport(ENIReportsCategoryEnum.INVOICING_FORM_FACTOR_TOTAL_REPORT.getName());
      reportResult = reportService.getAllActiveProducts(queries, ENIReportsCategoryEnum.INVOICING_FORM_FACTOR_TOTAL_REPORT.getRepository(), startDate, endDate);

    } catch(RecordsNotFoundException ex) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
    } catch(Exception ex) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
    }
    return reportResult;
  }

  @ApiOperation(value = "Invoicing Item Count in Kit Report Data", authorizations = { @Authorization(value="Authorization") })
  @GetMapping(path = "/fetchReport/invoicingReports/itemCountKit", produces = "application/json")
  public List<Object> fetchInvoicingItemCountKitReport(@RequestParam(value = "startDate", required = true) String startDate, @RequestParam(value = "endDate", required = true) String  endDate) {
    List<Object> reportResult;
    try {
      List<String> queries = reportService.getQueriesForReport(ENIReportsCategoryEnum.INVOICING_ITEM_COUNT_KIT_REPORT.getName());
      reportResult = reportService.getAllActiveProducts(queries, ENIReportsCategoryEnum.INVOICING_ITEM_COUNT_KIT_REPORT.getRepository(), startDate, endDate);

    } catch(RecordsNotFoundException ex) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
    } catch(Exception ex) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
    }
    return reportResult;
  }

  @ApiOperation(value = "MPT Report Data", authorizations = { @Authorization(value="Authorization") })
  @GetMapping(path = "/fetchReport/mptReportData", produces = "application/json")
  public Map<String, List<Object>> fetchMPTReports() {
    Map<String, List<Object>> invoicingReport = new HashMap<String, List<Object>>();
    try {
      List<String> perDayQuery = reportService.getQueriesForReport(ENIReportsCategoryEnum.MPT_REPORT_ORDER_COUNTS_PER_DAY.getName());
      List<Object> perDayResult = reportService.getAllActiveProducts(perDayQuery, ENIReportsCategoryEnum.MPT_REPORT_ORDER_COUNTS_PER_DAY.getRepository(), null, null);
      invoicingReport.put("MPT_REPORT_PER_DAY", perDayResult);

      List<String> segmentQuery = reportService.getQueriesForReport(ENIReportsCategoryEnum.MPT__REPORT_ORDER_COUNTS_BY_BUSINESS_SEGMENT.getName());
      List<Object> segmentResult = reportService.getAllActiveProducts(segmentQuery, ENIReportsCategoryEnum.MPT__REPORT_ORDER_COUNTS_BY_BUSINESS_SEGMENT.getRepository(), null, null);
      invoicingReport.put("MPT_REPORT_BY_SEGMENT", segmentResult);

      List<String> flyerCountQuery = reportService.getQueriesForReport(ENIReportsCategoryEnum.MPT__REPORT_ORDER_COUNTS_BY_FLYER_COUNTS.getName());
      List<Object> flyerCountResult = reportService.getAllActiveProducts(flyerCountQuery, ENIReportsCategoryEnum.MPT__REPORT_ORDER_COUNTS_BY_FLYER_COUNTS.getRepository(), null, null);
      invoicingReport.put("MPT_REPORT_BY_FLYER_COUNT", flyerCountResult);

      List<String> kitQuery = reportService.getQueriesForReport(ENIReportsCategoryEnum.MPT__REPORT_ORDER_COUNTS_BY_KIT.getName());
      List<Object> kitReportResult = reportService.getAllActiveProducts(kitQuery, ENIReportsCategoryEnum.MPT__REPORT_ORDER_COUNTS_BY_KIT.getRepository(), null, null);
      invoicingReport.put("MPT_REPORT_BY_KIT", kitReportResult);

      List<String> statusQuery = reportService.getQueriesForReport(ENIReportsCategoryEnum.MPT__REPORT_ORDER_COUNTS_BY_STATUS.getName());
      List<Object> statusResult = reportService.getAllActiveProducts(statusQuery, ENIReportsCategoryEnum.MPT__REPORT_ORDER_COUNTS_BY_STATUS.getRepository(), null, null);
      invoicingReport.put("MPT_REPORT_BY_STATUS", statusResult);

      List<String> usersQuery = reportService.getQueriesForReport(ENIReportsCategoryEnum.MPT__REPORT_ORDER_COUNTS_BY_USERS.getName());
      List<Object> usersResult = reportService.getAllActiveProducts(usersQuery, ENIReportsCategoryEnum.MPT__REPORT_ORDER_COUNTS_BY_USERS.getRepository(), null, null);
      invoicingReport.put("MPT_REPORT_BY_USERS", usersResult);

      List<String> totalsQuery = reportService.getQueriesForReport(ENIReportsCategoryEnum.MPT__REPORT_ORDER_COUNTS_TOTALS.getName());
      List<Object> totalsReportResult = reportService.getAllActiveProducts(totalsQuery, ENIReportsCategoryEnum.MPT__REPORT_ORDER_COUNTS_TOTALS.getRepository(), null, null);
      invoicingReport.put("MPT_REPORT_BY_TOTALS", totalsReportResult);

    } catch(RecordsNotFoundException ex) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
    } catch(Exception ex) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
    }
    return invoicingReport;
  }

  @ApiOperation(value = "MPT Reports Data for All Categories", authorizations = { @Authorization(value="Authorization") })
  @GetMapping(path = "/fetchReport/mptReports", produces = "application/json")
  public List<Object> fetchMPTReportsData() {
    List<Object> reportResult;
    try {
      List<String> queries = reportService.getQueriesForReport(ENIReportsCategoryEnum.MPT_REPORTS_DATA.getName());
      reportResult = reportService.getAllActiveProducts(queries, ENIReportsCategoryEnum.MPT_REPORTS_DATA.getRepository(), null, null);

    } catch(RecordsNotFoundException ex) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
    } catch(Exception ex) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
    }
    return reportResult;
  }


  @ApiOperation(value = "ENI Valid Connection", authorizations = { @Authorization(value="Authorization") })
  @GetMapping(value = {"/validConnection"})
  public String valid(HttpServletResponse response) {
    return "Success";
  }

}
