update batiment
SET  ndistrict = code
FROM pa_district
where district = nom

select district 
from batiment
where ndistrict is null

update batiment
SET ndistrict =  608
where district='Belo/Tsiribihina'