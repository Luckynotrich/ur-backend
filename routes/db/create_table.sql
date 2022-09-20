create table IF NOT EXISTS public.user(
    id UUID default uuid_generate_v4(),
    email varchar(100) unique not null,
    password varchar(50),
    primary key(id)
);

create table IF NOT EXISTS public.category(
    id Serial not null unique,
    userID uuid not null,
    cat_name varchar(100) unique not null,
     primary key(id),
     foreign key(userID) references public.user(id)
);

create table IF NOT EXISTS public.review(
    id serial not null unique,
    cat_id int not null,
    rev_name varchar(50),
    rev_url varchar(250),
    rev_date date,
    rating int,
    rev_text varchar(2500),
     primary key(id),
     foreign key(cat_id) references public.category(id)
);
create table IF NOT EXISTS public.preference(
    id serial not null unique,
    cat_id int,
    pref varchar(200),
    procon boolean,
     primary key(id),
     foreign key(cat_id) references public.category(id)     
);

CREATE TABLE IF NOT EXISTS public.checked(
    id serial not null unique,
    rev_id int not null,
    pref_id int not null,
    primary key(id),
    foreign key(rev_id) references public.review(id),
    foreign key(pref_id) references public.preference
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
