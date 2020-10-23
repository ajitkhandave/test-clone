INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('MONTHLY VOLUME REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'MONTHLY VOLUME REPORT';

update `reports_query_details` set `query_detail`='SELECT DATE(po.order_date) AS order_date, EXTRACT(YEAR_MONTH FROM DATE(po.order_date)) AS yearmonth , EXTRACT(YEAR FROM DATE(po.order_date)) AS order_year, EXTRACT(MONTH FROM DATE(po.order_date)) AS order_month , SUM(( CASE WHEN ( SELECT value FROM EnI.destination_property WHERE destination_id = d.id AND name = ''quantityOrdered'' ) IS NULL THEN li.quantity ELSE ( SELECT value FROM EnI.destination_property WHERE destination_id = d.id AND name = ''quantityOrdered'') END )) AS Ordered_Qty,  ( SELECT value FROM EnI.line_item_component_custom_property WHERE line_item_component_id = lic.id AND NAME = ''productName'' ) AS Product_Name, ( SELECT value FROM EnI.line_item_component_custom_property liccp  JOIN EnI.sku_item si  ON si.item_number = liccp.value WHERE line_item_component_id = lic.id AND NAME = ''sku'' ) AS Item_Number, (  SELECT si.item_revision_number  FROM  EnI.sku_item si  JOIN EnI.line_item_component_custom_property liccp  ON si.item_number = liccp.value  WHERE  line_item_component_id = lic.id  AND NAME = ''sku''  )  AS Item_Revision_Number FROM EnI.platform_order po JOIN EnI.line_item li ON po.id = li.order_id JOIN EnI.line_item_component lic ON li.id = lic.line_item_id JOIN EnI.destination d ON li.id = d.line_item_id WHERE po.program_id = 3 and ( SELECT value FROM EnI.line_item_component_custom_property liccp JOIN EnI.sku_item si ON si.item_number = liccp.value WHERE line_item_component_id = lic.id AND NAME = ''sku'' ) is not null GROUP BY EXTRACT(YEAR_MONTH FROM DATE(po.order_date)) ,( SELECT value FROM EnI.line_item_component_custom_property liccp  JOIN  EnI.sku_item si  ON si.item_number = liccp.value WHERE line_item_component_id = lic.id AND NAME = ''sku'' )' , `datasource` = 'eni', `created_date` = NOW(), `modified_date` = NOW()
where report_id = (SELECT report_id from reports_details where report_name = 'MONTHLY VOLUME REPORT')