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
 * Defines a model corresponding to Shipment Orders Addresses
 * @author Anju Garg
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Builder
public class ShipmentOrderAddresses implements Serializable {

  @EmbeddedId
  private ShipmentAddressIdentity identity;

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

  @Column(name = "order_status")
  private String orderStatus;

}
