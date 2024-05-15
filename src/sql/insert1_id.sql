ALTER TABLE IF EXISTS public.cv_vente
    ADD COLUMN id serial NOT NULL;
ALTER TABLE IF EXISTS public.cv_vente
    ADD PRIMARY KEY (id);