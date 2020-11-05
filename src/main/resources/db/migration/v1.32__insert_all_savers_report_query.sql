INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('ALL SAVERS REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'ALL SAVERS REPORT';

update `reports_query_details` set `query_detail`='SELECT count(DISTINCT po.id) AS orders_count, DATE(po.order_date) AS order_date, lic.customer_sku as customer_product_id,( SELECT value FROM ${schema}.order_property WHERE order_id = po.id AND name = ''p3Segment'' ) AS p3Segment, li.id AS li_id, sum(lic.quantity) as total_quantity, lic.id AS lic_id, ( SELECT value FROM ${schema}.line_item_component_custom_property WHERE line_item_component_id = lic.id AND NAME = ''productName'' ) AS product_name, count(( CASE WHEN LOWER(li.customer_product_id) LIKE ''%kit%'' THEN 1 END )) as kits_count FROM ${schema}.platform_order po JOIN ${schema}.line_item li ON po.id = li.order_id JOIN ${schema}.line_item_component lic ON li.id = lic.line_item_id JOIN ${schema}.destination d ON li.id = d.line_item_id WHERE po.program_id = 3 AND ( ( SELECT DATE(modified_date) FROM ${schema}.line_item_status WHERE line_item_id = li.id AND status = ''SHIPPED'' GROUP BY line_item_id) IS NOT NULL OR ( ( SELECT status FROM ${schema}.line_item_status WHERE id = li.line_item_status_id) != ''SHIPPED''  AND LEFT(( SELECT TRIM(message) FROM ${schema}.tracking_status WHERE LEFT(TRIM(message), 2) = ''1Z'' AND destination_id = d.id GROUP BY destination_id), 2) = ''1Z'' ) ) AND ( SELECT value FROM ${schema}.line_item_component_custom_property WHERE line_item_component_id = lic.id AND NAME = ''productName'' ) LIKE ''%All%%Savers%''  group by DATE(po.order_date),customer_sku ' , `datasource` = '${schema}', `created_date` = NOW(), `modified_date` = NOW()
where report_id = (SELECT report_id from reports_details where report_name = 'ALL SAVERS REPORT')
