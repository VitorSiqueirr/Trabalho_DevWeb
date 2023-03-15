import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddBookIdToOrdersBook1678900331837 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "orders_books",
      new TableColumn({
        name: "book_id",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "orders_books",
      new TableForeignKey({
        name: "OrdersBooksBook",
        columnNames: ["book_id"],
        referencedTableName: "books",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("orders_books", "OrdersBooksBook");
    await queryRunner.dropColumn("orders_books", "book_id");
  }
}
