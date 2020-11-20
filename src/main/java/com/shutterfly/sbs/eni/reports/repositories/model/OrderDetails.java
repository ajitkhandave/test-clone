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
 * Defines an order-details corresponding to Order Details Report.
 * @author Anju Garg
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Builder
public class OrderDetails implements Serializable {

  @Id
  @Column(name = "po_id")
  private String orderId;

  @Column(name = "client_order_id")
  private String clientOrderId;

  @Column(name = "order_date")
  private String orderDate;

  @Column(name = "order_need_by_date")
  private String needByDate;

  @Column(name = "ship_method")
  private String shipMethod;

  @Column(name = "p3_order_id")
  private String p3OrderId;

  @Column(name = "segment")
  private String segment;

  @Column(name = "Plans_And_Products")
  private String plansAndProducts;

  @Column(name = "number_of_employees")
  private String numberOfEmployees;

  @Column(name = "mpt_approver")
  private String mptApprover;

  @Column(name = "mpt_approved_date")
  private String mptApprovedDate;

  @Column(name = "oe_start_date")
  private String oeStartDate;

  @Column(name = "oe_end_date")
  private String oeEndDate;

  @Column(name = "event_type")
  private String eventType;

  @Column(name = "event_date")
  private String eventDate;

  @Column(name = "customer_name")
  private String customerName;

  @Column(name = "print_procurement_team")
  private String printProcurementTeam;

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

  @Column(name = "complete_ship_date")
  private String completeShipDate;

  @Column(name = "ship_to_company_name")
  private String shipToCompanyName;

  @Column(name = "first_name")
  private String firstName;

  @Column(name = "last_name")
  private String lastName;

  @Column(name = "address1")
  private String address1;

  @Column(name = "address2")
  private String address2;

  @Column(name = "city")
  private String city;

  @Column(name = "state")
  private String state;

  @Column(name = "zip_code")
  private String zipCode;

  @Column(name = "order_status")
  private String orderStatus;

  @Column(name = "purchaser")
  private String purchaser;

  @Column(name = "purchaser_email")
  private String purchaser_email;

}
