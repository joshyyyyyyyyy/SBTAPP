CREATE TABLE "User" (
  "user_id" int PRIMARY KEY,
  "username" varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL
);

CREATE TABLE "Store" (
  "store_id" int PRIMARY KEY,
  "store_name" varchar(255) NOT NULL,
  "route_id" int NOT NULL
);

CREATE TABLE "Product" (
  "product_id" int PRIMARY KEY,
  "product_description" text NOT NULL
);

CREATE TABLE "OrderDetails" (
  "order_id" int PRIMARY KEY,
  "user_id" int,
  "route_id" int,
  "store_id" int,
  "product_id" int,
  "qty_shipped" int NOT NULL,
  "qty_wasted" int NOT NULL
);

ALTER TABLE "OrderDetails" ADD FOREIGN KEY ("user_id") REFERENCES "User" ("user_id");

ALTER TABLE "OrderDetails" ADD FOREIGN KEY ("route_id") REFERENCES "Store" ("route_id");

ALTER TABLE "OrderDetails" ADD FOREIGN KEY ("store_id") REFERENCES "Store" ("store_id");

ALTER TABLE "OrderDetails" ADD FOREIGN KEY ("product_id") REFERENCES "Product" ("product_id");
