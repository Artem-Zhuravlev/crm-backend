import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitTables1674567890123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE clients (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100),
                phone VARCHAR(20),
                notes TEXT
            );
        `);

    await queryRunner.query(`
            CREATE TABLE appointments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title VARCHAR(100) NOT NULL,
                description TEXT,
                date DATETIME NOT NULL,
                completed BOOLEAN DEFAULT 0,
                clientId INTEGER,
                FOREIGN KEY(clientId) REFERENCES clients(id) ON DELETE CASCADE
            );
        `);

    await queryRunner.query(`
            CREATE TABLE payments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                amount DECIMAL(10,2) NOT NULL,
                date DATETIME NOT NULL,
                method VARCHAR(50),
                clientId INTEGER,
                FOREIGN KEY(clientId) REFERENCES clients(id) ON DELETE CASCADE
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE payments`);
    await queryRunner.query(`DROP TABLE appointments`);
    await queryRunner.query(`DROP TABLE clients`);
  }
}
