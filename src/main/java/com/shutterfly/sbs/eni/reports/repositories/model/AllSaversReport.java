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
 * Defines a model corresponding to All Savers Report
 * @author Anju Garg
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Builder
public class AllSaversReport implements Serializable {

  @Column(name = "orders_count")
  private String ordersPerSku;

  @Column(name = "order_date")
  private String orderDate;

  @Column(name = "p3Segment")
  private String p3Segment;

  @Column(name = "li_id")
  private String lineItemId;

  @Column(name = "total_quantity")
  private String quantity;

  @Column(name = "lic_id")
  private String lineComponentId;

  @Id
  @Column(name = "customer_sku")
  private String sku;

  @Column(name = "productName")
  private String productName;

  @Column(name = "kits_count")
  private String kitsCount;

}
