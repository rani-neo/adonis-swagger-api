import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PortfolioClients extends BaseSchema {
  protected tableName = 'portfolio_clients'  // A pivot table usually combines the names of both related tables

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('portfolio_id').unsigned().references('id').inTable('portfolios').onDelete('CASCADE')
      table.integer('client_id').unsigned().references('id').inTable('clients').onDelete('CASCADE')
      table.primary(['portfolio_id', 'client_id'])  // Making the combination of both columns as the primary key
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
