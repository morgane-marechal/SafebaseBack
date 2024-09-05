--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Debian 16.4-1.pgdg120+1)
-- Dumped by pg_dump version 16.4 (Debian 16.4-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.backup_liste DROP CONSTRAINT backup_liste_database_id_fkey;
ALTER TABLE ONLY public.database_liste DROP CONSTRAINT database_liste_pkey;
ALTER TABLE ONLY public.backup_liste DROP CONSTRAINT backup_liste_pkey;
ALTER TABLE public.database_liste ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.backup_liste ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.database_liste_id_seq;
DROP TABLE public.database_liste;
DROP SEQUENCE public.backup_liste_id_seq;
DROP TABLE public.backup_liste;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: backup_liste; Type: TABLE; Schema: public; Owner: safebase
--

CREATE TABLE public.backup_liste (
    id integer NOT NULL,
    type text NOT NULL,
    path text NOT NULL,
    saved_date timestamp without time zone,
    database_id integer
);


ALTER TABLE public.backup_liste OWNER TO safebase;

--
-- Name: backup_liste_id_seq; Type: SEQUENCE; Schema: public; Owner: safebase
--

CREATE SEQUENCE public.backup_liste_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.backup_liste_id_seq OWNER TO safebase;

--
-- Name: backup_liste_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: safebase
--

ALTER SEQUENCE public.backup_liste_id_seq OWNED BY public.backup_liste.id;


--
-- Name: database_liste; Type: TABLE; Schema: public; Owner: safebase
--

CREATE TABLE public.database_liste (
    id integer NOT NULL,
    "user" text NOT NULL,
    password text NOT NULL,
    host text,
    port integer,
    type text NOT NULL,
    name text NOT NULL,
    container_name text
);


ALTER TABLE public.database_liste OWNER TO safebase;

--
-- Name: database_liste_id_seq; Type: SEQUENCE; Schema: public; Owner: safebase
--

CREATE SEQUENCE public.database_liste_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.database_liste_id_seq OWNER TO safebase;

--
-- Name: database_liste_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: safebase
--

ALTER SEQUENCE public.database_liste_id_seq OWNED BY public.database_liste.id;


--
-- Name: backup_liste id; Type: DEFAULT; Schema: public; Owner: safebase
--

ALTER TABLE ONLY public.backup_liste ALTER COLUMN id SET DEFAULT nextval('public.backup_liste_id_seq'::regclass);


--
-- Name: database_liste id; Type: DEFAULT; Schema: public; Owner: safebase
--

ALTER TABLE ONLY public.database_liste ALTER COLUMN id SET DEFAULT nextval('public.database_liste_id_seq'::regclass);


--
-- Data for Name: backup_liste; Type: TABLE DATA; Schema: public; Owner: safebase
--

COPY public.backup_liste (id, type, path, saved_date, database_id) FROM stdin;
1	postgres	/home/morgane/projets/SafebaseBack/Sauvegardes/SauvegardesPosteGres/savebase_postgres_2024-09-04_13-10-44.sql	\N	1
\.


--
-- Data for Name: database_liste; Type: TABLE DATA; Schema: public; Owner: safebase
--

COPY public.database_liste (id, "user", password, host, port, type, name, container_name) FROM stdin;
2	prod	pass	localhost	3307	mysql	prod	safebaseback-mysql_database_prod-1
1	dev	pass	\N	\N	postgres	dev	safebaseback-postgres_database_dev-1
\.


--
-- Name: backup_liste_id_seq; Type: SEQUENCE SET; Schema: public; Owner: safebase
--

SELECT pg_catalog.setval('public.backup_liste_id_seq', 1, true);


--
-- Name: database_liste_id_seq; Type: SEQUENCE SET; Schema: public; Owner: safebase
--

SELECT pg_catalog.setval('public.database_liste_id_seq', 2, true);


--
-- Name: backup_liste backup_liste_pkey; Type: CONSTRAINT; Schema: public; Owner: safebase
--

ALTER TABLE ONLY public.backup_liste
    ADD CONSTRAINT backup_liste_pkey PRIMARY KEY (id);


--
-- Name: database_liste database_liste_pkey; Type: CONSTRAINT; Schema: public; Owner: safebase
--

ALTER TABLE ONLY public.database_liste
    ADD CONSTRAINT database_liste_pkey PRIMARY KEY (id);


--
-- Name: backup_liste backup_liste_database_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: safebase
--

ALTER TABLE ONLY public.backup_liste
    ADD CONSTRAINT backup_liste_database_id_fkey FOREIGN KEY (database_id) REFERENCES public.database_liste(id);


--
-- PostgreSQL database dump complete
--

