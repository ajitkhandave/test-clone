package com.shutterfly.sbs.eni.reports.repositories.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
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
public class InvoicingShippedLineItemReport implements Serializable {

  @EmbeddedId
  private OrderDetailsIdentity identity;

  @Column(name = "client_order_id")
  private String clientOrderId;

  @Column(name = "p3_order_id")
  private String p3_order_id;

  @Column(name = "order_date")
  private String order_date;

  @Column(name = "order_need_by_date")
  private String needByDate;

  @Column(name = "customer_product_id")
  private String customer_product_id;

  @Column(name = "customer_sku")
  private String customer_sku;

  @Column(name = "lic_page_count")
  private String lic_page_count;

  @Column(name = "product_name")
  private String product_name;

  @Column(name = "sku_description")
  private String sku_description;

  @Column(name = "sku")
  private String sku;

  @Column(name = "liccp_page_count")
  private String liccp_page_count;

  @Column(name = "print_vendor")
  private String printVendor;

  @Column(name = "gl_code")
  private String glCode;

  @Column(name = "is_static")
  private String isStatic;

  @Column(name = "size")
  private String size;

  @Column(name = "black_color")
  private String blackColor;

  @Column(name = "finish")
  private String finish;

  @Column(name = "page_count")
  private String pageCount;

  @Column(name = "oe_start_date")
  private String oeStartDate;

  @Column(name = "oe_end_date")
  private String oeEndDate;

  @Column(name = "p3_segment")
  private String p3Segment;

  @Column(name = "complete_ship_date")
  private String shipDate;

  @Column(name = "order_status")
  private String orderStatus;

  @Column(name = "line_item_status")
  private String lineItemStatus;

  @Column(name = "tracking_number")
  private String tracking_number;

  @Column(name = "quantity_shipped")
  private String quantityShipped;

  @Column(name = "order_rank")
  private String orderRank;

  @Column(name = "quantity_ordered")
  private String quantityOrdered;

  @Column(name = "page_count_config_join")
  private String pageCountConfigJoin;

  @Column(name = "product_price")
  private String productPrice;

  @Column(name = "kitting_price")
  private String kittingPrice;

  @Column(name = "label_and_carton_price")
  private String labeAndCartonPrice;

  @Column(name = "staple_price")
  private String staplePrice;

  @Column(name = "tax_amount")
  private String taxAmount;

  @Column(name = "total_amount")
  private String totalAmount;


}
