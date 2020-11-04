INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('ALL SAVERS REPORT BY MONTH', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'ALL SAVERS REPORT BY MONTH';

update `reports_query_details` set `query_detail`='SELECT count(DISTINCT po.id) AS orders_count, DATE(po.order_date) as order_date, EXTRACT(YEAR_MONTH FROM DATE(po.order_date)) order_month, EXTRACT(YEAR_MONTH FROM DATE(po.order_date)) order_year,sum(lic.quantity) as total_quantity FROM ${schema}.platform_order po JOIN ${schema}.line_item li ON po.id = li.order_id JOIN ${schema}.line_item_component lic ON li.id = lic.line_item_id JOIN ${schema}.destination d ON li.id = d.line_item_id WHERE po.program_id = 3 AND ( ( SELECT DATE(modified_date) FROM ${schema}.line_item_status WHERE line_item_id = li.id AND status = ''SHIPPED'' GROUP BY line_item_id) IS NOT NULL OR ( ( SELECT status FROM ${schema}.line_item_status WHERE id = li.line_item_status_id) != ''SHIPPED''  AND LEFT(( SELECT TRIM(message) FROM ${schema}.tracking_status WHERE LEFT(TRIM(message), 2) = ''1Z'' AND destination_id = d.id GROUP BY destination_id), 2) = ''1Z'' ) ) AND ( SELECT value FROM ${schema}.line_item_component_custom_property WHERE line_item_component_id = lic.id AND NAME = ''productName'' ) LIKE ''%All%%Savers%''  group by DATE(po.order_date) ' , `datasource` = '${schema}', `created_date` = NOW(), `modified_date` = NOW()
where report_id = (SELECT report_id from reports_details where report_name = 'ALL SAVERS REPORT BY MONTH')
