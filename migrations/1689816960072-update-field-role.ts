import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFieldRole1689816960072 implements MigrationInterface {
    name = 'UpdateFieldRole1689816960072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "roles" TO "role"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "role" TO "roles"`);
    }

}
