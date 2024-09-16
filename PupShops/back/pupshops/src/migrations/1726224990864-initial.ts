import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1726224990864 implements MigrationInterface {
    name = 'Initial1726224990864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "brand" character varying(255) NOT NULL, "imgUrl" text NOT NULL DEFAULT 'http', "category_id" uuid, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderDetails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, "order_id" uuid, CONSTRAINT "REL_76d98794a8c9305943ad307b79" UNIQUE ("order_id"), CONSTRAINT "PK_11d407f307ebf19af9702464e22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "userId" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "location" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying NOT NULL, "latitude" numeric(10,7) NOT NULL, "longitude" numeric(10,7) NOT NULL, "userId" uuid, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "USERS" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "lastname" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, "isAdmin" boolean NOT NULL, "phone" bigint NOT NULL, "country" character varying(50) NOT NULL, "city" character varying(50) NOT NULL, "address" text NOT NULL, CONSTRAINT "UQ_a1689164dbbcca860ce6d17b2e1" UNIQUE ("email"), CONSTRAINT "PK_b16c39a00c89083529c6166fa5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderdetails_products" ("product_id" uuid NOT NULL, "orderdetail_id" uuid NOT NULL, CONSTRAINT "PK_b65a1c21b4a0ca1ef946a8ed495" PRIMARY KEY ("product_id", "orderdetail_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_11ec3ce7e3afd0ebd129d4d440" ON "orderdetails_products" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b242cf9c19ecd9d43a470cb715" ON "orderdetails_products" ("orderdetail_id") `);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderDetails" ADD CONSTRAINT "FK_76d98794a8c9305943ad307b797" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "USERS"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_bdef5f9d46ef330ddca009a8596" FOREIGN KEY ("userId") REFERENCES "USERS"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderdetails_products" ADD CONSTRAINT "FK_11ec3ce7e3afd0ebd129d4d4406" FOREIGN KEY ("product_id") REFERENCES "orderDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orderdetails_products" ADD CONSTRAINT "FK_b242cf9c19ecd9d43a470cb7152" FOREIGN KEY ("orderdetail_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdetails_products" DROP CONSTRAINT "FK_b242cf9c19ecd9d43a470cb7152"`);
        await queryRunner.query(`ALTER TABLE "orderdetails_products" DROP CONSTRAINT "FK_11ec3ce7e3afd0ebd129d4d4406"`);
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_bdef5f9d46ef330ddca009a8596"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "orderDetails" DROP CONSTRAINT "FK_76d98794a8c9305943ad307b797"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b242cf9c19ecd9d43a470cb715"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_11ec3ce7e3afd0ebd129d4d440"`);
        await queryRunner.query(`DROP TABLE "orderdetails_products"`);
        await queryRunner.query(`DROP TABLE "USERS"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "orderDetails"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
