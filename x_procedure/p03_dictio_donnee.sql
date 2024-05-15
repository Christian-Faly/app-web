INSERT INTO  pa_dictio_donnee (nomtable, code, description, rang, masque, affiche_tableau, affiche_masque)
SELECT columns.table_name,
    columns.column_name,
    columns.column_name AS description,
    columns.ordinal_position,
    pa_type_champs.masque_defaut,
    true AS affiche_tableau,
    true AS affiche_masque
   FROM information_schema.columns
     JOIN pa_type_champs ON pa_type_champs.description::text = columns.data_type::text
  WHERE columns.table_name::name = 'rm_liste_restreinte'::name AND NOT (columns.column_name::name::text IN ( SELECT 'ncommune'::text AS text
        UNION
         SELECT 'ndistrict'::text AS text
        UNION
         SELECT 'nregion'::text AS text));

