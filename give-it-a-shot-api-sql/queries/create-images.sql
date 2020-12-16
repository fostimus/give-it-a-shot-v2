create table images (id SERIAL NOT NULL, name varchar(255), image bytea, "fileExt" varchar(255), "createdAt" timestamptz, "updatedAt" timestamptz, PRIMARY KEY(id));
