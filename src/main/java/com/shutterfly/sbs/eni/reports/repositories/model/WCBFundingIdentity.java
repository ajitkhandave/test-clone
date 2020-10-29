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
public class WCBFundingIdentity implements Serializable  {


  @Column(name = "order_date")
  private String order_date;

  @Column(name = "funding_type")
  private String fundingType;

}
