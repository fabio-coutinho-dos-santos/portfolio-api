import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsers1689513467025 implements MigrationInterface {
    name = 'UpdateUsers1689513467025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "test" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "test"`);
    }

}
