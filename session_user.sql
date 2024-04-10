--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Ubuntu 16.2-1.pgdg22.04+1)
-- Dumped by pg_dump version 16.2 (Ubuntu 16.2-1.pgdg22.04+1)

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

--
-- Name: user-session; Type: DATABASE; Schema: -; Owner: lucky
--

-- CREATE DATABASE "user-session" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';


ALTER DATABASE "future_self2" OWNER TO lucky;

\connect -reuse-previous=on "dbname='future_self2'"

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: session__user; Type: TABLE; Schema: public; Owner: lucky
--

CREATE TABLE public.session__user (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.session__user OWNER TO lucky;

--
-- Data for Name: session__user; Type: TABLE DATA; Schema: public; Owner: lucky
--

COPY public.session__user (sid, sess, expire) FROM stdin;
988M7Mz06lb5TTQPpF8gLVJNsMXYRL1P	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-02T18:41:38.574Z","httpOnly":true,"path":"/"},"passport":{},"flash":{"success_msg1":["You have logged out."],"logged_status":["false"]}}	2024-05-02 11:41:39
u0mdFM9SA8hcTr1NGE50q7KoEuAwaIUJ	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-02T18:50:09.878Z","httpOnly":true,"path":"/"},"passport":{},"flash":{}}	2024-05-02 11:50:10
csGfOH-lI4lxkwF5OB6W5HlnVwDsVScR	{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-02T17:46:45.894Z","httpOnly":true,"path":"/"},"passport":{},"flash":{"success_msg1":["You have logged out."]}}	2024-05-02 10:46:46
\.


--
-- Name: session__user session_pkey; Type: CONSTRAINT; Schema: public; Owner: lucky
--

ALTER TABLE ONLY public.session__user
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: lucky
--

CREATE INDEX "IDX_session_expire" ON public.session__user USING btree (expire);


--
-- PostgreSQL database dump complete
--

