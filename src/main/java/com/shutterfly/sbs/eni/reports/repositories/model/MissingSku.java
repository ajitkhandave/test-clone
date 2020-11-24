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
public class MissingSku implements Serializable {

    @Id
    @Column(name = "sku")
    private String sku;

}
