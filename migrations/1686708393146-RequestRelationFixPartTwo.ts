import { MigrationInterface, QueryRunner } from "typeorm";

export class RequestRelationFixPartTwo1686708393146 implements MigrationInterface {
    name = 'RequestRelationFixPartTwo1686708393146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`request_hook\` DROP FOREIGN KEY \`FK_ffdea6a239d4c84a817217edf10\``);
        await queryRunner.query(`DROP INDEX \`IDX_ffdea6a239d4c84a817217edf1\` ON \`request_hook\``);
        await queryRunner.query(`ALTER TABLE \`request_hook\` ADD CONSTRAINT \`FK_ffdea6a239d4c84a817217edf10\` FOREIGN KEY (\`responseId\`) REFERENCES \`request_response\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`request_hook\` DROP FOREIGN KEY \`FK_ffdea6a239d4c84a817217edf10\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_ffdea6a239d4c84a817217edf1\` ON \`request_hook\` (\`responseId\`)`);
        await queryRunner.query(`ALTER TABLE \`request_hook\` ADD CONSTRAINT \`FK_ffdea6a239d4c84a817217edf10\` FOREIGN KEY (\`responseId\`) REFERENCES \`request_hook\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
