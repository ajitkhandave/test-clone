package com.shutterfly.sbs.eni.reports.repositories.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;
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
public class MPTStatusIdentity implements Serializable  {

  @Column(name = "status")
  private String status;
  @Column(name = "print_vendor")
  private String printVendor;
  @Column(name = "order_date")
  private String orderDate;

}
