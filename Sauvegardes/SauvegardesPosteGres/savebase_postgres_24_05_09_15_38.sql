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

ALTER TABLE ONLY public.plantes DROP CONSTRAINT plantes_pkey;
ALTER TABLE public.plantes ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.plantes_id_seq;
DROP TABLE public.plantes;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: plantes; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.plantes (
    id integer NOT NULL,
    nom character varying(100) NOT NULL,
    prix numeric(5,2) NOT NULL
);


ALTER TABLE public.plantes OWNER TO dev;

--
-- Name: plantes_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.plantes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.plantes_id_seq OWNER TO dev;

--
-- Name: plantes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.plantes_id_seq OWNED BY public.plantes.id;


--
-- Name: plantes id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.plantes ALTER COLUMN id SET DEFAULT nextval('public.plantes_id_seq'::regclass);


--
-- Data for Name: plantes; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.plantes (id, nom, prix) FROM stdin;
1	Aloe Vera	9.99
2	Basil	3.49
3	Cactus	5.29
4	Lavender	7.50
5	Orchid	12.99
6	Snake Plant	15.25
7	Fern	6.75
8	Mint	2.99
9	Rosemary	4.50
10	Spider Plant	8.49
11	Ficus	22.99
12	Succulent	4.99
13	Pothos	7.89
14	Peace Lily	13.49
15	Bamboo	10.99
16	Jade Plant	11.29
17	Palm	25.49
18	Dracaena	16.79
19	Chrysanthemum	6.99
20	Daisy	3.89
21	Tulip	7.25
22	Azalea	9.50
23	Ivy	5.79
24	Geranium	8.99
25	Marigold	3.49
26	Peony	15.99
27	Petunia	4.75
28	Hydrangea	20.99
29	Begonia	9.29
30	Zinnia	3.99
31	Snapdragon	4.59
32	Daffodil	5.89
33	Bluebell	6.49
34	Sunflower	7.99
35	Hibiscus	12.49
36	Lilac	8.79
37	Bougainvillea	14.99
38	Gardenia	13.79
39	Hosta	11.59
40	Pansy	2.99
41	Viola	3.79
42	Lily	9.79
43	Freesia	6.29
44	Crocus	4.39
45	Primrose	5.49
46	Gerbera	7.49
47	Camellia	17.99
48	Carnation	8.29
49	Foxglove	12.29
\.


--
-- Name: plantes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.plantes_id_seq', 49, true);


--
-- Name: plantes plantes_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.plantes
    ADD CONSTRAINT plantes_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

