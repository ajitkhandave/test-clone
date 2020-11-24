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
public class PricingError implements Serializable {

    @Id
    @Column(name = "uuid")
    private String uuid;

    @Column(name = "customer_sku")
    private String customerSku;

    @Column(name = "size")
    private String size;

    @Column(name = "black_color")
    private String blackColor;

    @Column(name = "finish")
    private String finish;

    @Column(name = "page_count")
    private int pageCount;

    @Column(name = "occurances")
    private int occurances;

}
