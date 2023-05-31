import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1685501496104 implements MigrationInterface {
    name = 'FirstMigration1685501496104'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`request_response\` (\`id\` int NOT NULL AUTO_INCREMENT, \`receivedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`code\` int NOT NULL, \`body\` json NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`request_hook\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`headers\` json NULL, \`body\` json NULL, \`method\` enum ('GET', 'POST', 'PUT', 'DELETE', 'PATCH') NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`sendAt\` timestamp NULL, \`isSended\` tinyint NOT NULL DEFAULT 0, \`sendedAt\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`request_hook\``);
        await queryRunner.query(`DROP TABLE \`request_response\``);
    }

}
