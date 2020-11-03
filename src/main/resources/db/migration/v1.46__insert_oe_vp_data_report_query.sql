INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('OE VP DATA REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'OE VP DATA REPORT';

update `reports_query_details` set `query_detail`='( SELECT ( CASE WHEN ( LEFT(lic.customer_sku, LOCATE(''.'', lic.customer_sku) - 1) LIKE ''MT-1021355%'' OR LEFT(lic.customer_sku, LOCATE(''.'', lic.customer_sku) - 1) LIKE ''9183516%'' OR LEFT(lic.customer_sku, LOCATE(''.'', lic.customer_sku) - 1) LIKE ''9201633%'' ) THEN ''OECB'' WHEN ( LEFT(lic.customer_sku, LOCATE(''.'', lic.customer_sku) - 1) LIKE ''9144528%'' OR LEFT(lic.customer_sku, LOCATE(''.'', lic.customer_sku) - 1) LIKE ''MT-1170047%'' ) THEN ''Placemat'' WHEN lic.customer_sku IN ( ''2017001'', ''2017002'' ) THEN ''Benefit Summary'' WHEN lic.customer_sku = ''3017001'' THEN ''All Savers-Plan Highlights'' WHEN lic.customer_sku = ''4017001'' THEN ''Benefits At A Glance'' WHEN lic.customer_sku = ''2017003'' THEN ''Summary of Benefits (SBC)'' WHEN LEFT(lic.customer_sku, LOCATE(''.'', lic.customer_sku) - 1) LIKE ''EI2090401%'' THEN ''OE Static Brochure'' WHEN ( SELECT value FROM ${schema}.line_item_component_custom_property WHERE line_item_component_id = lic.id AND NAME = ''productType'' ) = ''Static'' THEN ( CASE WHEN ( SELECT LOWER(value) FROM ${schema}.line_item_component_custom_property WHERE line_item_component_id = lic.id AND NAME = ''productName'' ) LIKE ''%envelope%'' THEN ''Envelope'' WHEN ( SELECT LOWER(value) FROM ${schema}.line_item_component_custom_property WHERE line_item_component_id = lic.id AND NAME = ''productName'' ) LIKE ''%folder%'' THEN ''Folder'' ELSE ''Flyer'' END ) END ) AS product_segment , ( SELECT value FROM ${schema}.order_property WHERE order_id = po.id AND name = ''p3Segment'' ) AS p3Segment , DATE(po.order_date) as order_date, ( CASE WHEN ( lic.customer_sku = ''MT-1021355.0'' OR lic.customer_sku = ''MT-1021355.1'' ) THEN ''Medical'' WHEN ( LEFT(lic.customer_sku, LOCATE(''.'', lic.customer_sku) - 1) LIKE ''9201633%'' OR lic.customer_sku = ''MT-1021355.3'' ) THEN ''Financial Protection'' WHEN ( LEFT(lic.customer_sku, LOCATE(''.'', lic.customer_sku) - 1) LIKE ''9183516%'' OR lic.customer_sku = ''MT-1021355.2'' ) THEN RIGHT(( SELECT value FROM ${schema}.line_item_component_custom_property WHERE line_item_component_id = lic.id AND ( NAME = ''TEMPLATEProduct_Type'' OR NAME = ''TEMPLATE_Product_Type'' ) ), 6) END ) AS oecb_template , SUM(li.quantity) AS quantity , COUNT(DISTINCT po.id) AS orders , 0 AS people FROM ${schema}.platform_order po JOIN ${schema}.line_item li ON po.id = li.order_id JOIN ${schema}.line_item_component lic ON li.id = lic.line_item_id JOIN ${schema}.${schema}_sku_info si ON si.item_number = LEFT(lic.customer_sku, LOCATE(".", lic.customer_sku) - 1) WHERE po.program_id = 3 AND  AND si.line_of_business = ''OE Program'' AND YEAR(po.order_date) >= YEAR(CURDATE()) - 1 AND ( SELECT status FROM ${schema}.order_status WHERE id = po.order_status_id ) IN ( ''SENT_TO_PRINTER'', ''SHIPPED'', ''CLOSED'' ) AND ( SELECT LOWER(value) FROM ${schema}.line_item_component_custom_property WHERE line_item_component_id = lic.id AND NAME = ''productName'' ) NOT LIKE ''%envelope%'' AND ( SELECT LOWER(value) FROM ${schema}.line_item_component_custom_property WHERE line_item_component_id = lic.id AND NAME = ''productName'' ) NOT LIKE ''%folder%'' GROUP BY DATE(po.order_date),( CASE WHEN ( LEFT(lic.customer_sku, LOCATE(''.'', lic.customer_sku) - 1) LIKE ''MT-1021355%'' OR LEFT(lic.customer_sku, LOCATE(''.'', lic.customer_sku) - 1) LIKE ''9183516%'' OR LEFT(lic.customer_sku, LOCATE(''.'', lic.customer_sku) - 1) LIKE ''9201633%'' ) THEN ''OECB'' WHEN ( LEFT(lic.customer_sku, LOCATE(''.'', lic.customer_sku) - 1) LIKE ''9144528%'' OR LEFT(lic.customer_sku, LOCATE(''.'', lic.customer_sku) - 1) LIKE ''MT-1170047%'' ) THEN ''Placemat'' WHEN lic.customer_sku IN ( ''2017001'', ''2017002'' ) THEN ''Benefit Summary'' WHEN lic.customer_sku = ''3017001'' THEN ''All Savers-Plan Highlights'' WHEN lic.customer_sku = ''4017001'' THEN ''Benefits At A Glance'' WHEN lic.customer_sku = ''2017003'' THEN ''Summary of Benefits (SBC)'' WHEN LEFT(lic.customer_sku, LOCATE(''.'', lic.customer_sku) - 1) LIKE ''EI2090401%'' THEN ''OE Static Brochure'' WHEN ( SELECT value FROM ${schema}.line_item_component_custom_property WHERE line_item_component_id = lic.id AND NAME = ''productType'' ) = ''Static'' THEN ( CASE WHEN ( SELECT LOWER(value) FROM ${schema}.line_item_component_custom_property WHERE line_item_component_id = lic.id AND NAME = ''productName'' ) LIKE ''%envelope%'' THEN ''Envelope'' WHEN ( SELECT LOWER(value) FROM ${schema}.line_item_component_custom_property WHERE line_item_component_id = lic.id AND NAME = ''productName'' ) LIKE ''%folder%'' THEN ''Folder'' ELSE ''Flyer'' END ) END ) , ( SELECT value FROM ${schema}.order_property WHERE order_id = po.id AND name = ''p3Segment'' ) , ( CASE WHEN ( lic.customer_sku = ''MT-1021355.0'' OR lic.customer_sku = ''MT-1021355.1'' ) THEN ''Medical'' WHEN ( LEFT(lic.customer_sku, LOCATE(''.'', lic.customer_sku) - 1) LIKE ''9201633%'' OR lic.customer_sku = ''MT-1021355.3'' ) THEN ''Financial Protection'' WHEN ( LEFT(lic.customer_sku, LOCATE(''.'', lic.customer_sku) - 1) LIKE ''9183516%'' OR lic.customer_sku = ''MT-1021355.2'' ) THEN RIGHT(( SELECT value FROM ${schema}.line_item_component_custom_property WHERE line_item_component_id = lic.id AND ( NAME = ''TEMPLATEProduct_Type'' OR NAME = ''TEMPLATE_Product_Type'' ) ), 6) END ) ) UNION ALL ( SELECT ''Kits Ordered'' AS product_segment , NULL AS p3Segment , DATE(po.order_date) as order_date, NULL AS oecb_template , SUM(li.quantity) AS quantity , COUNT(DISTINCT li.id) AS orders , 0 AS people FROM ${schema}.platform_order po JOIN ${schema}.line_item li ON po.id = li.order_id WHERE po.program_id = 3 AND li.id IN ( SELECT line_item_id FROM ${schema}.line_item_component lic JOIN ${schema}.${schema}_sku_info si ON si.item_number = LEFT(lic.customer_sku, LOCATE(".", lic.customer_sku) - 1) WHERE si.line_of_business = ''OE Program'' GROUP BY line_item_id ) AND YEAR(po.order_date) >= YEAR(CURDATE()) - 1 AND ( SELECT status FROM ${schema}.order_status WHERE id = po.order_status_id ) IN ( ''SENT_TO_PRINTER'', ''SHIPPED'', ''CLOSED'' ) AND LOWER(li.customer_product_id) LIKE ''%kit%'' ) UNION ALL ( SELECT ''Open Enrollment Queue Flag'' AS product_segment , NULL AS p3Segment , DATE(po.order_date) as order_date, NULL AS oecb_template , SUM(li.quantity) AS quantity , COUNT(DISTINCT po.id) AS orders , 0 AS people FROM ${schema}.platform_order po JOIN ${schema}.line_item li ON po.id = li.order_id JOIN ${schema}.line_item_component lic ON li.id = lic.line_item_id JOIN ${schema}.${schema}_sku_info si ON si.item_number = LEFT(lic.customer_sku, LOCATE(".", lic.customer_sku) - 1) WHERE po.program_id = 3 AND AND si.line_of_business = ''OE Program'' AND YEAR(po.order_date) >= YEAR(CURDATE()) - 1 AND ( SELECT status FROM ${schema}.order_status WHERE id = po.order_status_id ) IN ( ''SENT_TO_PRINTER'', ''SHIPPED'', ''CLOSED'' ) AND ( ( SELECT order_id FROM ${schema}.note WHERE order_id = po.id AND LOWER(note) LIKE ''%team input successfully received%'' GROUP BY order_id) ) > 0 ) UNION ALL ( SELECT ''Unique Users'' AS product_segment , NULL AS p3Segment , DATE(po.order_date) as order_date, NULL AS oecb_template , 0 AS quantity , 0 AS orders , COUNT(DISTINCT ( SELECT value FROM ${schema}.order_property WHERE order_id = po.id AND name = ''userName'')) AS people FROM ${schema}.platform_order po JOIN ${schema}.line_item li ON po.id = li.order_id JOIN ${schema}.line_item_component lic ON li.id = lic.line_item_id JOIN ${schema}.${schema}_sku_info si ON si.item_number = LEFT(lic.customer_sku, LOCATE(".", lic.customer_sku) - 1) WHERE po.program_id = 3 AND  AND si.line_of_business = ''OE Program'' AND YEAR(po.order_date) >= YEAR(CURDATE()) - 1 AND ( SELECT status FROM ${schema}.order_status WHERE id = po.order_status_id ) IN ( ''SENT_TO_PRINTER'', ''SHIPPED'', ''CLOSED'' ) ) UNION ALL ( SELECT ''Unique Clients'' AS product_segment , NULL AS p3Segment , DATE(po.order_date) as order_date, NULL AS oecb_template , 0 AS quantity , 0 AS orders , COUNT(DISTINCT d.organization_name) AS people FROM ${schema}.platform_order po JOIN ${schema}.line_item li ON po.id = li.order_id JOIN ${schema}.destination d ON li.id = d.line_item_id JOIN ${schema}.line_item_component lic ON li.id = lic.line_item_id JOIN ${schema}.${schema}_sku_info si ON si.item_number = LEFT(lic.customer_sku, LOCATE(".", lic.customer_sku) - 1) WHERE po.program_id = 3 AND AND si.line_of_business = ''OE Program'' AND YEAR(po.order_date) >= YEAR(CURDATE()) - 1 AND ( SELECT status FROM ${schema}.order_status WHERE id = po.order_status_id ) IN ( ''SENT_TO_PRINTER'', ''SHIPPED'', ''CLOSED'' ) )' , `datasource` = '${schema}', `created_date` = NOW(), `modified_date` = NOW()
where report_id = (SELECT report_id from reports_details where report_name = 'OE VP DATA REPORT')
