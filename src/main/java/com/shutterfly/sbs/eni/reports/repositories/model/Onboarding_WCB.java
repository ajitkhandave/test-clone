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
 * Defines a model corresponding to Onboarding Dashboard Report
 * @author Anju Garg
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Builder
public class Onboarding_WCB implements Serializable  {

  @Id
  @Column(name = "uuid")
  private String uuid;

  @Column(name = "po_id")
  private String platformOrderId;

  @Column(name = "client_order_id")
  private String clientOrderId;

  @Column(name = "order_date")
  private String orderDate;

  @Column(name = "order_need_by_date")
  private String orderNeedByDate;

  @Column(name = "order_status")
  private String orderStatus;

  @Column(name = "event_date")
  private String eventDate;

  @Column(name = "user_name")
  private String userName;

  @Column(name = "p3Segment")
  private String p3Segment;

  @Column(name = "li_id")
  private String lineItemId;

  @Column(name = "customer_product_id_orig")
  private String customerProductIdOrigin;

  @Column(name = "customer_product_id")
  private String customerProductId;

  @Column(name = "quantity")
  private String quantity;

  @Column(name = "lic_id")
  private String lineItemComponentId;

  @Column(name = "customer_sku")
  private String customerSku;

  @Column(name = "Number_of_Subscribers")
  private String numberOfSubscribers;

  @Column(name = "business_segment")
  private String businessSegment;

  @Column(name = "funding_type")
  private String fundingType;

  @Column(name = "segment")
  private String segment;

  @Column(name = "funding")
  private String funding;

  @Column(name = "value2")
  private String value2;

  @Column(name = "title")
  private String title;


}
