create table favorites (id SERIAL NOT NULL, "userId" integer, "drinkId" integer, "createdAt" timestamptz, "updatedAt" timestamptz, PRIMARY KEY(id));
