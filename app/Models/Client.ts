import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';

import Portfolio from './Portfolio';  // Import the Portfolio model

/**
 * @swagger
 * components:
 *  schemas:
 *    Client:
 *      type: object
 *      properties: 
 *        id:
 *          type: number
 *        client_name:
 *          type: string
 *        created_at:
 *          type: string
 *          format: date-time
 *        updated_at:
 *          type: string
 *          format: date-time
 *      required:
 *        - id
 *        - client_name
 *        - created_at
 *        - updated_at
 */
export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public clientName: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Portfolio , {
    pivotTable: 'portfolio_clients',
  })
  public portfolios: ManyToMany<typeof Portfolio>
}
