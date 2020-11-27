package com.shutterfly.sbs.eni.reports.repositories.model;

import java.io.Serializable;
import javax.persistence.Column;
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
public class InvoicingOrderReport implements Serializable {

  @Id
  @Column(name = "client_order_id")
  private String clientOrderId;

  @Column(name = "order_need_by_date")
  private String needByDate;

  @Column(name = "p3_order_id")
  private String p3OrderId;

  @Column(name = "print_vendor")
  private String printVendor;

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

  @Column(name = "complete_ship_date")
  private String shipDate;

  @Column(name = "order_status")
  private String orderStatus;


  @Column(name = "quantity_ordered")
  private String quantityOrdered;

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
