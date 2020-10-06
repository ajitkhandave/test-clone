package com.shutterfly.sbs.eni.reports.repositories.platformorder;


import javax.persistence.Id;
import lombok.Data;


import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import java.util.Date;


@Data
@Entity
@Table(name = "sbs_platform_order.platform_order")
public class PlatformOrder {

  @Id
  @Column(name="client_order_id")
  private String clientOrderId;

  @Column(name="program_id")
  private String programId;

  @Column(name="tenant_id")
  private String tenantId;




}
