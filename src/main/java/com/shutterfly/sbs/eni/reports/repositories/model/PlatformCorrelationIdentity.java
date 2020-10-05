package com.shutterfly.sbs.eni.reports.repositories.model;

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
public class PlatformCorrelationIdentity implements Serializable {
  @Column(name = "correlation_id")
  private String correlationId;
  @Column(name = "platform_order_id")
  private String platformOrderId;
}
