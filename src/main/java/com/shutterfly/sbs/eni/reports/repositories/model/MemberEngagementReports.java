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
 * Defines a model corresponding to All Savers Report
 * @author Anju Garg
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Builder
public class MemberEngagementReports implements Serializable {

  @Id
  @Column(name = "uuid")
  private String uuid;

  @Column(name = "po_id")
  private String platformOrderId;

  @Column(name = "client_order_id")
  private String clientOrderId;

  @Column(name = "order_date")
  private String orderDate;

  @Column(name = "order_status")
  private String orderStatus;

  @Column(name = "line_item_status")
  private String lineItemStatus;

  @Column(name = "complete_ship_date")
  private String completeShipDate;

  @Column(name = "tracking_number")
  private String trackingNumber;

  @Column(name = "p3Segment")
  private String p3Segment;

  @Column(name = "li_id")
  private String lineItemId;

  @Column(name = "customer_product_id")
  private String customerProductId;

  @Column(name = "quantity")
  private String quantity;

  @Column(name = "lic_id")
  private String lineItemComponentId;

  @Column(name = "customer_sku")
  private String customerSku;

  @Column(name = "sku_trimmed")
  private String sku;

  @Column(name = "product_name")
  private String productName;

  @Column(name = "kit_identifier")
  private String kitIdentifier;


}
