INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('INVOICING REPORT BY SHIPPED', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'INVOICING REPORT BY SHIPPED';

update `reports_query_details` set `query_detail`='SELECT b.*, ep.sfly_config_price AS sfly_price, ep.dl_config_price AS dl_price, ep.otp_config_price AS otp_price FROM ( SELECT a.* , esi.is_static, esi.size, esi.black_color, CAST(( CASE WHEN ( CASE WHEN a.page_count_2 IS NULL THEN esi.page_count ELSE a.page_count_2 END ) IS NULL THEN NULL WHEN ( CASE WHEN a.page_count_2 IS NULL THEN esi.page_count ELSE a.page_count_2 END ) < 8 THEN ''Loose'' WHEN ( CASE WHEN a.page_count_2 IS NULL THEN esi.page_count ELSE a.page_count_2 END ) < 48 THEN ''Saddle Stitch'' ELSE ''Perfect'' END ) AS CHAR(50)) AS finish , ( CASE WHEN a.page_count_2 IS NULL THEN esi.page_count ELSE a.page_count_2 END ) AS pageCount , ( CASE WHEN ( CASE WHEN a.page_count_2 IS NULL THEN esi.page_count ELSE a.page_count_2 END ) < 8 THEN ( CASE WHEN a.page_count_2 IS NULL THEN esi.page_count ELSE a.page_count_2 END ) WHEN ( CASE WHEN a.page_count_2 IS NULL THEN esi.page_count ELSE a.page_count_2 END ) < 48 THEN CEILING(( CASE WHEN a.page_count_2 IS NULL THEN esi.page_count ELSE a.page_count_2 END ) / 4)*4 ELSE CEILING(( CASE WHEN a.page_count_2 IS NULL THEN esi.page_count ELSE a.page_count_2 END ) / 8)*8 END ) AS page_count_config_join , ( CASE WHEN LOCATE(".", a.sku) > 0 THEN LEFT(a.sku, LOCATE(".", a.sku) - 1) ELSE a.sku END ) AS sku_no_ver , IFNULL(( CASE WHEN LOCATE(".", a.sku) > 0 THEN RIGHT(a.sku, LENGTH(a.sku) - LOCATE(".", a.sku)) END ), 0) AS version FROM ( SELECT po.id AS po_id, po.client_order_id, DATE(po.order_date) AS order_date, DATE(po.order_need_by_date) AS order_need_by_date, li.id AS li_id, li.customer_product_id, lic.id AS lic_id, ( SELECT value FROM sbs_platform_order.order_property WHERE order_id = po.id AND name = ''p3OrderId'' ) AS p3_Order_id, SUBSTRING_INDEX(SUBSTRING_INDEX(( SELECT value FROM sbs_platform_order.order_property WHERE order_id = po.id AND name = ''artworkFileLocation''), ''/'', 6), ''/'', - 1) AS print_vendor, ( SELECT value FROM sbs_platform_order.order_property WHERE order_id = po.id AND name = ''taxAmount'' ) AS tax_amount, ( SELECT value FROM sbs_platform_order.order_property WHERE order_id = po.id AND name = ''totalAmount'' ) AS total_amount, ( SELECT value FROM sbs_platform_order.order_property WHERE order_id = po.id AND name = ''totalAmount'' ) - ( SELECT value FROM sbs_platform_order.order_property WHERE order_id = po.id AND name = ''taxAmount'') AS product_amount, ( SELECT value FROM sbs_platform_order.order_property WHERE order_id = po.id AND name = ''GLCode'' ) AS gl_code, ( SELECT value FROM sbs_platform_order.order_property WHERE order_id = po.id AND name = ''oeStartDate'' ) AS oe_start_date, ( SELECT value FROM sbs_platform_order.order_property WHERE order_id = po.id AND name = ''oeEndDate'' ) AS oe_end_date, ( SELECT value FROM sbs_platform_order.order_property WHERE order_id = po.id AND name = ''p3Segment'' ) AS p3_segment, ( SELECT value FROM sbs_platform_order.line_item_component_custom_property WHERE line_item_component_id = lic.id AND NAME = ''productName'' ) AS productName, ( SELECT value FROM sbs_platform_order.line_item_component_custom_property WHERE line_item_component_id = lic.id AND NAME = ''skuDescription'' ) AS sku_description, ( SELECT value FROM sbs_platform_order.line_item_component_custom_property WHERE line_item_component_id = lic.id AND NAME = ''sku'' ) AS sku, ( SELECT CAST(value AS UNSIGNED) FROM sbs_platform_order.line_item_component_custom_property WHERE line_item_component_id = lic.id AND NAME = ''pageCount'' ) AS page_count_2, ( SELECT DATE(modified_date) FROM sbs_platform_order.order_status WHERE order_id = po.id AND status LIKE ''%SHIPPED%'' GROUP BY order_id ) AS complete_ship_date, d.id AS d_id, ( SELECT status FROM sbs_platform_order.order_status WHERE id = po.order_status_id ) AS order_status, ( SELECT status FROM sbs_platform_order.line_item_status WHERE id = li.line_item_status_id ) AS line_item_status, ( SELECT TRIM(message) FROM sbs_platform_order.tracking_status WHERE LEFT(TRIM(message), 2) = ''1Z'' AND destination_id = d.id GROUP BY destination_id ) AS tracking_number, ( SELECT value FROM sbs_platform_order.destination_property WHERE destination_id = d.id AND name = ''quantityShipped'' ) AS quantity_shipped, ( CASE WHEN ( SELECT value FROM sbs_platform_order.destination_property WHERE destination_id = d.id AND name = ''quantityOrdered'' ) IS NULL THEN li.quantity ELSE ( SELECT value FROM sbs_platform_order.destination_property WHERE destination_id = d.id AND name = ''quantityOrdered'') END ) AS quantity_ordered , ( CASE WHEN d.order_rank = 1 THEN 1 ELSE 0 END ) AS order_rank FROM sbs_platform_order.platform_order po JOIN sbs_platform_order.line_item li ON po.id = li.order_id JOIN sbs_platform_order.line_item_component lic ON li.id = lic.line_item_id JOIN sbs_platform_order.destination d ON li.id = d.line_item_id LEFT JOIN ( SELECT b.* , @order_kit2 = b.po_id AS order_kit2 , @rank2 = if(@prev_order_number2 != @order_kit2, 1, @rank2 + 1) AS order_rank , @prev_order_number2 = @order_kit2 as dummy FROM ( SELECT po.id AS po_id, li.id AS li_id, lic.id AS lic_id, d.id AS d_id, ( SELECT value FROM sbs_platform_order.order_property WHERE order_id = po.id AND name = ''p3OrderId'' ) AS p3_order_id, po.client_order_id, li.customer_product_id, ( CASE WHEN LOWER(li.customer_product_id) LIKE ''%-kit%'' THEN ''-kit'' END ) AS kit FROM sbs_platform_order.platform_order po JOIN sbs_platform_order.line_item li ON po.id = li.order_id JOIN sbs_platform_order.line_item_component lic ON li.id = lic.line_item_id JOIN sbs_platform_order.destination d ON li.id = d.line_item_id WHERE po.program_id = 3 AND SUBSTRING_INDEX(SUBSTRING_INDEX(( SELECT value FROM sbs_platform_order.order_property WHERE order_id = po.id AND name = ''artworkFileLocation''), ''/'', 6), ''/'', - 1) != ''RR-DO-11'' ) b, ( SELECT @rank2 = 0 ) r, ( SELECT @prev_order_number2 = '''' ) p ) d ON d.po_id = po.id AND d.li_id = li.id AND d.lic_id = lic.id AND d.d_id = d.id WHERE po.program_id = 3 AND SUBSTRING_INDEX(SUBSTRING_INDEX(( SELECT value FROM sbs_platform_order.order_property WHERE order_id = po.id AND name = ''artworkFileLocation''), ''/'', 6), ''/'', - 1) != ''RR-DO-11'' ) a LEFT JOIN sbs_platform_order.eni_sku_info esi ON esi.item_number = ( CASE WHEN LOCATE(".", a.sku) > 0 THEN LEFT(a.sku, LOCATE(".", a.sku) - 1) ELSE a.sku END ) ) b LEFT JOIN sbs_platform_order.eni_pricing ep ON ep.size = b.size AND ep.finish = b.finish AND ep.page_count = b.page_count_config_join AND ep.black_color = b.black_color' , `datasource` = '${schema}', `created_date` = NOW(), `modified_date` = NOW()
where report_id = (SELECT report_id from reports_details where report_name = 'INVOICING REPORT BY SHIPPED')
