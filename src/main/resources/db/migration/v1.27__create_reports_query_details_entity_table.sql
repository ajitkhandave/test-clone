create table if not exists `reports_details`
(
    `report_id` bigint(20) NOT NULL AUTO_INCREMENT,
    `report_name` varchar(255) not null,
    `created_by` varchar(255) NOT NULL,
    `created_date` datetime DEFAULT NULL,
    `modified_by` varchar(255) NOT NULL,
    `modified_date` datetime DEFAULT NULL,
    PRIMARY KEY (report_id)

) ENGINE=InnoDB DEFAULT CHARSET=latin1;

create table if not exists `reports_query_details`
(
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `report_id` bigint(20) NOT NULL,
    `query_detail` varchar(1000) DEFAULT '',
    `datasource` varchar(500) null,
    `created_by` varchar(255) DEFAULT 'admin',
    `created_date` datetime DEFAULT NULL,
    `modified_by` varchar(255) DEFAULT 'admin',
    `modified_date` datetime DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (report_id) REFERENCES reports_details (report_id)

) ENGINE=InnoDB DEFAULT CHARSET=latin1;