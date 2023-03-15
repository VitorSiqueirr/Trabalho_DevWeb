import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddReaderIdToOrders1678898963232 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "orders",
      new TableColumn({
        name: "reader_id",
        type: "uuid",
        isNullable: true,
      })
    );
    await queryRunner.createForeignKey(
      "orders",
      new TableForeignKey({
        name: "OrdersReader",
        columnNames: ["reader_id"],
        referencedTableName: "readers",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      })
    );
  }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey("orders", "OrdersReader");
      await queryRunner.dropColumn("orders", "reader_id");
    }

}
