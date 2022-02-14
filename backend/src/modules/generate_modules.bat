echo off
set moduleNames=users pages orders ordersRows basket basketRows cargo products productCategories productBrands productImages productProperties productPropertiesRows
(for %%n in (%moduleNames%) do (
   echo ------------ Create module: %%n ------------
	npx nest generate module %%n
	npx nest generate controller %%n
	npx nest generate service %%n
	npx nest generate resolver %%n  
)) 
pause





