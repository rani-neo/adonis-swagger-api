import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';

import Client from './Client'  // Import the Client model

/**
 * @swagger
 * components:
 *  schemas:
 *    Portfolio:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        portfolio_name:  // using snake_case for Swagger properties
 *          type: string
 *        created_at:
 *          type: string
 *          format: date-time
 *        updated_at:
 *          type: string
 *          format: date-time
 *        clients:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Client' // assuming you have a Client schema defined
 *      required:
 *        - id
 *        - portfolio_name
 *        - created_at
 *        - updated_at
 */
export default class Portfolio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public portfolioName: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  /* @manyToMany(() => Skill, {
    pivotTable: 'user_skills',
  })
   */
  @manyToMany(() => Client
  , {
    pivotTable: 'portfolio_clients',
  })
  public clients: ManyToMany<typeof Client>
}
