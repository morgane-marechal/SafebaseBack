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

ALTER TABLE ONLY public.favoris DROP CONSTRAINT favoris_id_user_fkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.plantes DROP CONSTRAINT plantes_pkey;
ALTER TABLE ONLY public.favoris DROP CONSTRAINT favoris_pkey;
ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.plantes ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.favoris ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.users_id_seq;
DROP TABLE public.users;
DROP SEQUENCE public.plantes_id_seq;
DROP TABLE public.plantes;
DROP TABLE public.musique_pour_plante;
DROP SEQUENCE public.favoris_id_seq;
DROP TABLE public.favoris;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: favoris; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.favoris (
    id integer NOT NULL,
    id_user integer NOT NULL,
    id_plantes integer[] NOT NULL
);


ALTER TABLE public.favoris OWNER TO dev;

--
-- Name: favoris_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.favoris_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.favoris_id_seq OWNER TO dev;

--
-- Name: favoris_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.favoris_id_seq OWNED BY public.favoris.id;


--
-- Name: musique_pour_plante; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.musique_pour_plante (
    id integer NOT NULL,
    nom text NOT NULL
);


ALTER TABLE public.musique_pour_plante OWNER TO dev;

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
-- Name: users; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    login character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL
);


ALTER TABLE public.users OWNER TO dev;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO dev;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: favoris id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.favoris ALTER COLUMN id SET DEFAULT nextval('public.favoris_id_seq'::regclass);


--
-- Name: plantes id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.plantes ALTER COLUMN id SET DEFAULT nextval('public.plantes_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: favoris; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.favoris (id, id_user, id_plantes) FROM stdin;
1	1	{1,3,5}
2	2	{2,4}
3	3	{1,2,3}
\.


--
-- Data for Name: musique_pour_plante; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.musique_pour_plante (id, nom) FROM stdin;
1	Douce feuille
2	Brume matin
\.


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
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.users (id, name, login, email, password) FROM stdin;
1	John Doe	jdoe	jdoe@example.com	password123
2	Jane Smith	jsmith	jsmith@example.com	password456
3	Michael Johnson	mjohnson	mjohnson@example.com	password789
4	Emily Davis	edavis	edavis@example.com	password101
5	Chris Brown	cbrown	cbrown@example.com	password202
6	Jessica Wilson	jwilson	jwilson@example.com	password303
7	David Moore	dmoore	dmoore@example.com	password404
8	Amanda Taylor	ataylor	ataylor@example.com	password505
9	Daniel Anderson	danderson	danderson@example.com	password606
10	Olivia Thomas	othomas	othomas@example.com	password707
11	James White	jwhite	jwhite@example.com	password808
12	Sophia Harris	sharris	sharris@example.com	password909
13	Matthew Clark	mclark	mclark@example.com	password010
14	Chloe Martin	cmartin	cmartin@example.com	password020
15	Robert Lewis	rlewis	rlewis@example.com	password030
16	Emma Walker	ewalker	ewalker@example.com	password040
17	Andrew Hall	ahall	ahall@example.com	password050
18	Isabella Young	iyoung	iyoung@example.com	password060
19	Joshua King	jking	jking@example.com	password070
20	Mia Scott	mscott	mscott@example.com	password080
21	Benjamin Green	bgreen	bgreen@example.com	password090
22	Ava Adams	aadams	aadams@example.com	password100
23	Ethan Nelson	enelson	enelson@example.com	password110
24	Lily Carter	lcarter	lcarter@example.com	password120
25	Jacob Mitchell	jmitchell	jmitchell@example.com	password130
26	Grace Perez	gperez	gperez@example.com	password140
27	Logan Roberts	lroberts	lroberts@example.com	password150
28	Scarlett Turner	sturner	sturner@example.com	password160
29	Lucas Phillips	lphillips	lphillips@example.com	password170
30	Evelyn Campbell	ecampbell	ecampbell@example.com	password180
31	Mason Parker	mparker	mparker@example.com	password190
32	Ella Evans	eevans	eevans@example.com	password200
33	Alexander Stewart	astewart	astewart@example.com	password210
34	Harper Collins	hcollins	hcollins@example.com	password220
35	Ryan Sanchez	rsanchez	rsanchez@example.com	password230
36	Aria Rogers	arogers	arogers@example.com	password240
37	Henry Bailey	hbailey	hbailey@example.com	password250
38	Avery Cooper	acooper	acooper@example.com	password260
39	Samuel Richardson	srichardson	srichardson@example.com	password270
40	Zoey Cox	zcox	zcox@example.com	password280
41	William Reed	wreed	wreed@example.com	password290
42	Hannah Ward	hward	hward@example.com	password300
43	Sebastian Cook	scook	scook@example.com	password310
44	Amelia Morgan	amorgan	amorgan@example.com	password320
45	Jayden Bell	jbell	jbell@example.com	password330
46	Sophie Murphy	smurphy	smurphy@example.com	password340
47	Levi Rivera	lrivera	lrivera@example.com	password350
48	Ella Flores	eflores	eflores@example.com	password360
\.


--
-- Name: favoris_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.favoris_id_seq', 3, true);


--
-- Name: plantes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.plantes_id_seq', 49, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.users_id_seq', 48, true);


--
-- Name: favoris favoris_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.favoris
    ADD CONSTRAINT favoris_pkey PRIMARY KEY (id);


--
-- Name: plantes plantes_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.plantes
    ADD CONSTRAINT plantes_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: favoris favoris_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.favoris
    ADD CONSTRAINT favoris_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

