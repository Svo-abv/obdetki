echo off
set moduleNames=users pages orders ordersRows basket basketRows cargo products productCategories productBrands productImages productProperties productPropertiesRows
(for %%n in (%moduleNames%) do (
   echo ------------ Create module: %%n ------------
	npx nest g resource %%n  --no-spec
)) 
pause





