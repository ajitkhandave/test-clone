package com.shutterfly.sbs.eni.reports.repositories.model;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Defines a model corresponding to Shipment Orders Report
 * @author Anju Garg
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Builder
public class ShipmentOrders implements Serializable {

  @Column(name = "p3order_id")
  private String p3OrderId;

  @Id
  @Column(name = "client_order_id")
  private String clientOrderId;

  @Column(name = "order_date")
  private String orderDate;

  @Column(name = "order_need_by_date")
  private String needByDate;

  @Column(name = "complete_ship_date")
  private String shipmentDate;

  @Column(name = "order_status")
  private String orderStatus;

  @Column(name = "print_vendor")
  private String printVendor;

  @Column(name = "shipments")
  private String shipments;

  @Transient
  private List<ShipmentOrderAddresses> addresses;

}
