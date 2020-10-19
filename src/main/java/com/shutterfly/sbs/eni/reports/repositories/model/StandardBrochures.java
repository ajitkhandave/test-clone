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
 * Defines a model corresponding to Online Dashboard Report
 * @author Anju Garg
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Builder
public class StandardBrochures implements Serializable {

  @Column(name = "orders_count")
  private String ordersPerSku;

  @Column(name = "order_date")
  private String orderDate;

  @Id
  @Column(name = "yearmonth")
  private String yearMonth;

  @Column(name = "p3Segment")
  private String p3Segment;

  @Column(name = "customer_product_id")
  private String product;

  @Column(name = "total_quantity")
  private String quantity;

  @Column(name = "Business_Segment")
  private String business_segment;

  @Column(name = "Funding_Type")
  private String funding_type;

  @Column(name = "title")
  private String title;



}
