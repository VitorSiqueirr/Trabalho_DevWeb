import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddBookIdToOrdersBooks1679161566558 implements MigrationInterface {
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
        name: "OrdersBooksBooks",
        columnNames: ["book_id"],
        referencedTableName: "books",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("orders_books", "OrdersBooksBooks");
    await queryRunner.dropColumn("orders_books", "book_id");
  }
}
