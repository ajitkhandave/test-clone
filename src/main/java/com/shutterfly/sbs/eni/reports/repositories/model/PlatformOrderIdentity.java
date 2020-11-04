package com.shutterfly.sbs.eni.reports.repositories.model;

import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

/**
 * Created by angarg on 18/6/19.
 */
@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlatformOrderIdentity implements Serializable {

  @Column(name = "Platform_Order_ID")
  private Long platformOrderId;

  @Column(name= "SBS_Order_Id")
  private String sbsOrderId;
}
