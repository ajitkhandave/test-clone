create table if not exists `reports_query_details_entity`
(
    `report_id` varchar(255) not null,
    `report_name` varchar(255) not null,
    `query_detail` varchar(1000) not null,
    `datasource` varchar(500) null,
    `created_by` varchar(255) NOT NULL,
    `created_date` datetime DEFAULT NULL,
    `modified_by` varchar(255) NOT NULL,
    `modified_date` datetime DEFAULT NULL,
    PRIMARY KEY (report_id, report_name)

) ENGINE=InnoDB DEFAULT CHARSET=latin1;