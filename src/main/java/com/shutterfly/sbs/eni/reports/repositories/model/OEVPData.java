package com.shutterfly.sbs.eni.reports.repositories.model;

import java.io.Serializable;
import javax.persistence.*;

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

  @Id
  @Column(name = "uuid")
  private String uuid;

  @Column(name = "product_segment")
  private String productSegment;

  @Column(name = "p3Segment")
  private String p3Segment;

  @Column(name = "ship_date")
  private String ship_date;

  @Column(name = "oecb_template")
  private String template;

  @Column(name = "quantity")
  private String quantity;

  @Column(name = "orders")
  private String orders;

  @Column(name = "people")
  private String people;

}
