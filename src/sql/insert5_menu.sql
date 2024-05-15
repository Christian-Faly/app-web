
select id,superficie_culture_principale, qt_semence_culture_principale
from benef_cep_2021
where superficie_culture_principale='0,25'
or qt_semence_culture_principale='0,25'

=======================
insert into mp_cep_beneficiaire( ref, village,nom_prenom_benef,surnom ,h_f ,annee_naissance ,cin ,statut_menage ,code_menage ,responsabilite_niveau_groupement ,
   responsabilite_niveau_comt ,sup_cult_principal ,sup_couvrt_scv ,qt_semence_culture_principale_kg ,qt_semence_scv_kg ,charrue ,
   herse ,rayonneur ,arrosoir ,sarcleuse,pulv ,rateau ,houe_semeuse ,ruche ,grille_reine ,case_reine ,attire_essaim ,cire_gauffree ,fil_inox ,insecticide ,
	fongicide ,herbicide ,dap,uree,porcelet ,rendement_production ,reff ,annee_activite ,nregion ,ndistrict,ncommune ,nfokontany,id_cep)
    
select benef_cep_2021.ref, 
benef_cep_2021.village ,nom_prenom_benef ,srnom ,h_f ,annee_naissance ,cin ,statut_menage ,code_menage ,responsabilites_niveau_groupement ,
	responsabilites_niveau_communaute ,
cast(superficie_culture_principale as float),

	"Superficie couverture si SCV en Ha" ,
	cast(qt_semence_culture_principale as float) ,qtsemence_scv ,charrue ,
	herse ,rayonneur ,arrosoir ,sarcleuse ,pulv ,rateau,roue_semeuse ,ruche ,grille_reine ,case_reine ,attire_essaim ,cire_gauffree ,fil_inox ,insecticide ,
    fongicide ,herbicide ,
	benef_cep_2021.dap ,benef_cep_2021.uree ,
	0,rendement_production ,ref2 ,0,nregion ,
	benef_cep_2021.ndistrict ,benef_cep_2021.ncommune ,benef_cep_2021.nfokontany, mp_cep_vao.id 


from mp_cep_vao, benef_cep_2021
where mp_cep_vao.ndistrict = benef_cep_2021.ndistrict
and mp_cep_vao.ncommune = benef_cep_2021.ncommune
and mp_cep_vao.pole = benef_cep_2021.pole
and mp_cep_vao.typologie_sol = benef_cep_2021.typologie_sol
and mp_cep_vao.nom_perimetre = benef_cep_2021.nom_perimetre
and mp_cep_vao.nom_groupement = benef_cep_2021.nom_groupement
and mp_cep_vao.speculation_special = benef_cep_2021.speculation_special
and mp_cep_vao.speculation_couverture_scv = benef_cep_2021.speculation_couverture_scv
and mp_cep_vao.campagne = benef_cep_2021.campagne
and mp_cep_vao.num_import =2

======================================

update benef_cep_2021
set superficie_culture_principale = '0.7'
where superficie_culture_principale = '0,7';
update benef_cep_2021
set qt_semence_culture_principale = '0.7'
where qt_semence_culture_principale = '0,7';

==================================
select superficie_culture_principale, qt_semence_culture_principale
from benef_cep_2021
where position(',' in superficie_culture_principale)>0
or position(',' in qt_semence_culture_principale)>0
group by superficie_culture_principale, qt_semence_culture_principale

====================================

SELECT speculation_special
FROM mp_cep_vao 
WHERE speculation_special ='Black Eyes'

====================================
UPDATE mp_cep_vao 
SET speculation_special = 'Black eyes'
WHERE speculation_special='Black Eyes'
=====================================
UPDATE mp_cep_vao
SET type_speculation = speculation_special
WHERE type_speculation IS NULL

==============================

SELECT speculation_special 
FROM  mp_cep_vao
WHERE  speculation_special LIKE 'Haricot%'
GROUP BY speculation_special

===========================

create table mp_mpv_izy as
select ref ,nregion, ndistrict, ncommune, date_mise_place, groupement ,race_speculation_type_peche , type_mp 
from mp_mpv_izy1
group by ref ,nregion, ndistrict, ncommune, date_mise_place, groupement ,race_speculation_type_peche , type_mp

==========================