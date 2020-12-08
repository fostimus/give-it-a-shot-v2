create table images (id SERIAL NOT NULL, name varchar(255), image bytea, "createdAt" timestamptz, "updatedAt" timestamptz, PRIMARY KEY(id));
