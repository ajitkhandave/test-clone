package com.shutterfly.sbs.eni.reports.repositories.model;

import java.io.Serializable;
import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Defines an order-details corresponding to MPT Report.
 * @author Anju Garg
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Builder
public class MPTFlyerCountsData implements Serializable  {

  @Id
  @Column(name = "uuid")
  private String uuid;

  @Column(name = "product_name")
  private String productName;
  @Column(name = "print_vendor")
  private String printVendor;
  @Column(name = "order_date")
  private String orderDate;

  @Column(name = "order_count")
  private String orderCount;

  @Column(name = "kit_count")
  private String kitCount;

  @Column(name = "quantity")
  private String quantity;

  @Column(name = "shipments")
  private String shipments;

}
