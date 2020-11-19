package com.shutterfly.sbs.eni.reports.repositories.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created by angarg on 18/6/19.
 */
@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShipmentAddressIdentity implements Serializable {

  @Column(name = "client_order_id")
  private String clientOrderId;

  @Column(name = "po_id")
  private String platformOrderId;

  @Column(name = "zip_code")
  private String zipCode;

}
