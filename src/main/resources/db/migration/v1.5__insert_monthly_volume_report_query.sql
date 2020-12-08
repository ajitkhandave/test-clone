update `reports_query_details` set `query_detail`='SELECT CONCAT(YEAR(po.order_date),MONTH(po.order_date)) AS yearmonth ,YEAR(po.order_date) AS order_year ,MONTH(po.order_date) AS order_month ,(CASE WHEN (SELECT value FROM ${schema}.destination_property WHERE destination_id = d.id AND name = ''quantityOrdered'') IS NULL THEN lic.quantity ELSE (SELECT value FROM ${schema}.destination_property WHERE destination_id = d.id AND name = ''quantityOrdered'') END) AS Ordered_Qty ,(SELECT value FROM ${schema}.line_item_component_custom_property WHERE line_item_component_id = lic.id AND NAME = ''productName'') AS Product_Name ,lic.customer_sku AS Item_Number ,si.item_revision_number AS Item_Revision_Number FROM ${schema}.platform_order po JOIN ${schema}.line_item li ON po.id = li.order_id JOIN ${schema}.line_item_component lic ON li.id = lic.line_item_id JOIN ${schema}.destination d ON li.id = d.line_item_id LEFT JOIN eni.sku_item si ON si.item_number = lic.customer_sku WHERE po.program_id = 3 GROUP BY (SELECT value FROM ${schema}.line_item_component_custom_property WHERE line_item_component_id = lic.id AND NAME = ''productName'') ,lic.customer_sku ,si.item_revision_number ,CONCAT(YEAR(po.order_date),MONTH(po.order_date))' , `datasource` = '${schema}', `created_date` = NOW(), `modified_date` = NOW()
where report_id = (SELECT report_id from reports_details where report_name = 'MONTHLY VOLUME REPORT')