import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Portfolios extends BaseSchema {
  protected tableName = 'portfolios'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('portfolio_name', 255).notNullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
