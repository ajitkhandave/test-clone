update `reports_query_details` set `query_detail`='SELECT count(DISTINCT po.id) AS orders_count , DATE(po.order_date) AS order_date , lic.customer_sku as customer_product_id , ( SELECT value FROM ${schema}.order_property WHERE order_id = po.id AND name = ''p3Segment'' ) AS p3Segment , li.id AS li_id ,SUM(CAST((CASE WHEN (SELECT value FROM ${schema}.destination_property WHERE destination_id = d.id AND name = ''quantityOrdered'') IS NULL THEN lic.quantity ELSE (SELECT value FROM ${schema}.destination_property WHERE destination_id = d.id AND name = ''quantityOrdered'') END) AS UNSIGNED)) as total_quantity , lic.id AS lic_id , ( SELECT value FROM ${schema}.line_item_component_custom_property WHERE line_item_component_id = lic.id AND NAME = ''productName'' ) AS product_name , count(( CASE WHEN LOWER(li.customer_product_id) LIKE ''%kit%'' THEN 1 END )) as kits_count FROM ${schema}.platform_order po JOIN ${schema}.line_item li ON po.id = li.order_id JOIN ${schema}.line_item_component lic ON li.id = lic.line_item_id JOIN ${schema}.destination d ON li.id = d.line_item_id WHERE po.program_id = 3 AND ( ( SELECT DATE(modified_date) FROM ${schema}.line_item_status WHERE line_item_id = li.id AND status = ''SHIPPED'' GROUP BY line_item_id) IS NOT NULL OR ( ( SELECT status FROM ${schema}.line_item_status WHERE id = li.line_item_status_id) != ''SHIPPED'' AND LEFT(( SELECT TRIM(message) FROM ${schema}.tracking_status WHERE LEFT(TRIM(message), 2) = ''1Z'' AND destination_id = d.id GROUP BY destination_id), 2) = ''1Z'' ) ) AND (CASE WHEN LOCATE(''.'',lic.customer_sku) > 0 THEN LEFT(lic.customer_sku,LOCATE(''.'',lic.customer_sku)-1) ELSE lic.customer_sku END) IN  ( ''9196258'',''8842269'',''MT-1112566'',''8688085'',''8469593'',''MT-1169711'',''MT-1183797'',''MT-1146578'',''MT-1108590'',''8616090'',''MT-989158'',''MT-1129649'',''MT-1152506'',''MT-1181143'',''MT-1037283'',''MT-1165790'',''8252496'',''13439-080618'', ''MT-1172777'',''MT-1168158'',''MT-1158993'',''MT-1168156'',''MT-1165156'',''MT-989346'',''MT-1158991'',''07857 053118'',''81321 080218'',''MT-8437968'',''MT-1144512'',''MT-1155125'',''MT-1070249'',''8439561'',''MT-1035708'', ''PCA544385'',''UHCEX754721'',''9045343'',''MT-1109496'',''MT-100989'',''MT-1106263'',''WF779297'',''32130A-022018'',''MT-1128612'',''MT-1128613'',''9471769'',''73218-032018'',''MT-1146575'',''MT-1146576'',''MT-1059613'',''MT-1106108'',''8989749'', ''MT-1129227'',''MT-1138032'',''MT-1138033'',''MT-1070076'',''MT-1138031'',''100-13350'',''MT-1014074'',''9348173'',''8810601'',''9068480'',''9281021'',''8471567'',''8550940'',''9348202'',''MT-1129564'',''MT-1014079'',''MT-1105314'', ''MT-993839'',''MT-1167529'',''MT-1167533'',''MT-1179135'',''MT-1179136'',''MT-1175989'',''8967324'',''9465924'',''EI2086721'',''9541190'',''EI2086716'',''9511718'',''9511824'',''9511795'',''9524071'',''8471547'',''9588298'', ''8476829'',''MT-1179625'',''9301789'',''9301813'',''9301810'',''9301783'',''9301814'',''8120584'',''MT-1179695'',''10061541'',''10141940'',''10146282'',''10146312'',''9701634'',''1937250'',''1937251'',''9900747'',''9900801'', ''EI2062105 SP'',''EI2062815 SP'',''EI2062117 SP'',''10345607'',''10345666'',''EI2062026'',''EI2061906'',''EI952932'',''EI2082663'',''EI2064054'',''EI2099945'',''EI20102955'' ) group by DATE(po.order_date) ,lic.customer_sku , ( SELECT value FROM ${schema}.line_item_component_custom_property WHERE line_item_component_id = lic.id AND NAME = ''productName'' )' , `datasource` = '${schema}', `created_date` = NOW(), `modified_date` = NOW()
where report_id = (SELECT report_id from reports_details where report_name = 'MEMBER ENGAGEMENT REPORT')
