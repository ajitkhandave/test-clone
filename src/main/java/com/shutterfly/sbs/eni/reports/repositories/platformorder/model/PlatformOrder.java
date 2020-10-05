package com.shutterfly.sbs.eni.reports.repositories.platformorder.model;


import javax.persistence.Id;
import lombok.Data;


import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import java.util.Date;


@Data
@Entity
@Table(name = "platform_order", uniqueConstraints = @UniqueConstraint(columnNames = {"programId", "clientOrderId"}))
public class PlatformOrder {


  private String programPrefix;  // prefix for platform order ID that represents program

  @Id
  private long orderId;
  @Column

  private Date orderDate;  // date customer sent order
  @Column

  private Date orderNeedByDate;  // date the order needs to be shipped
  @Column

  private Date orderSlaDate;  // Service Level Agreement date
  @Column

  private Date orderShippedDate;   // date order was shipped
  @Column

  private long programId;  // reference to the program identifier
  @Column

  private int tenantId;  // reference to the tenant identifier
  @Column
  private long transactionId;
  // reference to the incoming order file reference, which may be composed of multiple orders

  @Column
  private boolean isReprint;

  @Column
  private String reprintReasonCode;

  @Column(length = 128)

  private String originalClientOrderId;

  @Column(length = 128)

  private String clientOrderId;  // customer-defined order id
  @Column(length = 32)

  private String sbsOrderId;  // generated SBS unique id




}
