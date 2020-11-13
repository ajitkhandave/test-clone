package com.shutterfly.sbs.eni.reports.repositories.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Defines a model corresponding to Invoicing Report
 * @author Anju Garg
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Builder
public class InvoicingReport implements Serializable {

  @EmbeddedId
  private OrderDetailsIdentity identity;

  @Column(name = "client_order_id")
  private String clientOrderId;

  @Column(name = "order_date")
  private String orderDate;

  @Column(name = "order_need_by_date")
  private String needByDate;

  @Column(name = "customer_product_id")
  private String customerProductId;

  @Column(name = "p3_order_id")
  private String p3OrderId;

  @Column(name = "print_vendor")
  private String printVendor;

  @Column(name = "tax_amount")
  private String taxAmount;

  @Column(name = "total_amount")
  private String totalAmount;

  @Column(name = "product_amount")
  private String productAmount;

  @Column(name = "gl_code")
  private String glCode;

  @Column(name = "oe_start_date")
  private String oeStartDate;

  @Column(name = "oe_end_date")
  private String oeEndDate;

  @Column(name = "p3_segment")
  private String p3Segment;

  @Column(name = "customer_name")
  private String customerName;

  @Column(name = "product_name")
  private String productName;

  @Column(name = "sku_description")
  private String skuDescription;

  @Column(name = "sku")
  private String sku;

  @Column(name = "page_count_2")
  private String page_count;

  @Column(name = "complete_ship_date")
  private String shipDate;

  @Column(name = "order_status")
  private String orderStatus;

  @Column(name = "line_item_status")
  private String lineItemStatus;

  @Column(name = "tracking_number")
  private String trackingNumber;

  @Column(name = "quantity_shipped")
  private String quantityShipped;

  @Column(name = "quantity_ordered")
  private String quantityOrdered;

  @Column(name = "order_rank")
  private String orderRank;

  @Column(name = "is_static")
  private String isStatic;

  @Column(name = "size")
  private String size;

  @Column(name = "black_color")
  private String black_color;

  @Column(name = "finish")
  private String finish;

  @Column(name = "page_count")
  private String pageCount;

  @Column(name = "page_count_config_join")
  private String pageCountConfigJoin;

  @Column(name = "sku_no_ver")
  private String skuNumberVersion;

  @Column(name = "version")
  private String version;

  @Column(name = "sfly_price")
  private String sflyPrice;

  @Column(name = "dl_price")
  private String dlPrice;

  @Column(name = "otp_price")
  private String otpPrice;


}
