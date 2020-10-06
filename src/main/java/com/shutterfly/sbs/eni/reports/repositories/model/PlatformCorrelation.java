package com.shutterfly.sbs.eni.reports.repositories.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.Data;

/**
 * Created by angarg on 18/6/19.
 */
@Entity
@Table
@Data
public class PlatformCorrelation implements Serializable {

    @EmbeddedId
    private PlatformCorrelationIdentity platformCorrelationIdentity;

    @Column(name = "sbs_order_id")
    private String sbsOrderId;

    @Column(name = "status")
    private String status;

    @Column(name = "destination_id")
    private Long destinationId;

    @Column(name = "order_date")
    private Date orderDate;

    @Column(name = "last_modified_date")
    private Date lastModifiedDate;

}
