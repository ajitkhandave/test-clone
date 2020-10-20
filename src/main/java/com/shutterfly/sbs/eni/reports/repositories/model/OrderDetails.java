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

  @Column(name = "li_id")
  private String lineItemId;

  @Column(name = "ship_method")
  private String shipMethod;

  @Column(name = "customer_product_id")
  private String customerProductId;

  @Column(name = "lic_id")
  private String lineComponentId;

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

  @Column(name = "user_email")
  private String userEmail;

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

  @Column(name = "product_name")
  private String productName;

  @Column(name = "sku_description")
  private String skuDescription;

  @Column(name = "sku")
  private String sku;

  @Column(name = "complete_ship_date")
  private String completeShipDate;

  @Column(name = "d_id")
  private String destinationId;

  @Column(name = "ship_to_company_name")
  private String shipToCompanyName;

  @Column(name = "p_id")
  private String personId;

  @Column(name = "first_name")
  private String firstName;

  @Column(name = "last_name")
  private String lastName;

  @Column(name = "a_id")
  private String addressId;

  @Column(name = "address1")
  private String address1;

  @Column(name = "address2")
  private String address2;

  @Column(name = "address3")
  private String address3;

  @Column(name = "city")
  private String city;

  @Column(name = "state")
  private String state;

  @Column(name = "zip_code")
  private String zipCode;

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

}
