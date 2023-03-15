import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddOrderIdToOrdersBook1678900250416 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
          "orders_books",
          new TableColumn({
            name: "order_id",
            type: "uuid",
            isNullable: true,
          })
        );
    
        await queryRunner.createForeignKey(
          "orders_books",
          new TableForeignKey({
            name: "OrdersBooksOrders",
            columnNames: ["order_id"],
            referencedTableName: "orders",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("orders_books", "OrdersBooksOrders");
        await queryRunner.dropColumn("orders_books", "order_id");
      }

}
