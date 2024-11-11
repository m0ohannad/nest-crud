import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731349581961 implements MigrationInterface {
    name = 'Migration1731349581961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Articles" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "body" character varying NOT NULL, CONSTRAINT "PK_855d4c8e93574fddefaab9225c6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Articles"`);
    }

}
