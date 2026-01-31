import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1769863955230 implements MigrationInterface {
    name = ' $npmConfigName1769863955230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "appointments" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(100) NOT NULL, "description" text, "date" datetime NOT NULL, "completed" boolean NOT NULL DEFAULT (0), "clientId" integer)`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "amount" decimal(10,2) NOT NULL, "date" datetime NOT NULL, "method" varchar(50), "clientId" integer)`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "email" varchar(100), "phone" varchar(20), "notes" text)`);
        await queryRunner.query(`CREATE TABLE "temporary_appointments" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(100) NOT NULL, "description" text, "date" datetime NOT NULL, "completed" boolean NOT NULL DEFAULT (0), "clientId" integer, CONSTRAINT "FK_c4dbd8eb292b83b5dc67be3cf45" FOREIGN KEY ("clientId") REFERENCES "clients" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_appointments"("id", "title", "description", "date", "completed", "clientId") SELECT "id", "title", "description", "date", "completed", "clientId" FROM "appointments"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
        await queryRunner.query(`ALTER TABLE "temporary_appointments" RENAME TO "appointments"`);
        await queryRunner.query(`CREATE TABLE "temporary_payments" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "amount" decimal(10,2) NOT NULL, "date" datetime NOT NULL, "method" varchar(50), "clientId" integer, CONSTRAINT "FK_e7c2e95ccd4bd2068c70744dd65" FOREIGN KEY ("clientId") REFERENCES "clients" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_payments"("id", "amount", "date", "method", "clientId") SELECT "id", "amount", "date", "method", "clientId" FROM "payments"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`ALTER TABLE "temporary_payments" RENAME TO "payments"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" RENAME TO "temporary_payments"`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "amount" decimal(10,2) NOT NULL, "date" datetime NOT NULL, "method" varchar(50), "clientId" integer)`);
        await queryRunner.query(`INSERT INTO "payments"("id", "amount", "date", "method", "clientId") SELECT "id", "amount", "date", "method", "clientId" FROM "temporary_payments"`);
        await queryRunner.query(`DROP TABLE "temporary_payments"`);
        await queryRunner.query(`ALTER TABLE "appointments" RENAME TO "temporary_appointments"`);
        await queryRunner.query(`CREATE TABLE "appointments" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(100) NOT NULL, "description" text, "date" datetime NOT NULL, "completed" boolean NOT NULL DEFAULT (0), "clientId" integer)`);
        await queryRunner.query(`INSERT INTO "appointments"("id", "title", "description", "date", "completed", "clientId") SELECT "id", "title", "description", "date", "completed", "clientId" FROM "temporary_appointments"`);
        await queryRunner.query(`DROP TABLE "temporary_appointments"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
    }

}
