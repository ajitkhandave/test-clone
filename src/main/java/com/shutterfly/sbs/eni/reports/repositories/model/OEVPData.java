package com.shutterfly.sbs.eni.reports.repositories.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
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
public class OEVPData implements Serializable {

  @EmbeddedId
  private OEVPDataIdentity identity;

  @Column(name = "oecb_template")
  private String template;

  @Column(name = "quantity")
  private String quantity;

  @Column(name = "orders")
  private String orders;

  @Column(name = "people")
  private String people;

}
