update batiment
SET ncommune= code 
FROM pa_commune
where ndistrict = pa_commune.maitre 
and commune = nom 