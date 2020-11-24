package com.shutterfly.sbs.eni.reports.repositories.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Builder
public class ItemCountKit implements Serializable {

    @Id
    @Column(name = "uuid")
    private String uuid;

    @Column(name = "p3_order_Id")
    private String p3OrderId;

    @Column(name = "client_order_id")
    private String client_order_id;

    @Column(name = "order_date")
    private String order_date;

    @Column(name = "order_need_by_date")
    private String order_need_by_date;

    @Column(name = "complete_ship_date")
    private String complete_ship_date;

    @Column(name = "items_in_kit")
    private String items_in_kit;

}
