import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'

export default class ClientController {
  
  /**
   * @swagger
   * /clients:
   *   get:
   *     tags:
   *       - Clients
   *     summary: List all clients
   *     responses:
   *       '200':
   *         description: Successful operation
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Client'
   */
  public async index({ response }: HttpContextContract) {
    const clients = await Client.query();
//    const clients = await Client.query().preload('portfolios');

    return response.json(clients);
  }

  /**
   * @swagger
   * /clients/{id}:
   *   get:
   *     tags:
   *       - Clients
   *     summary: Get specific client by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the client to return
   *     responses:
   *       '200':
   *         description: Successful operation
   *       '404':
   *         description: Client not found
   */
  public async show({ params, response }: HttpContextContract) {
    //const client = await Client.query().preload('portfolios').where('id', params.id).firstOrFail();
    const client = await Client.query().where('id', params.id).firstOrFail();
    return response.json(client);
  }

  /**
   * @swagger
   * /clients:
   *   post:
   *     tags:
   *       - Clients
   *     summary: Create a new client
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Client'
   *     responses:
   *       '201':
   *         description: Client created
   */
  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['clientName']);
    const client = await Client.create(data);
    return response.status(201).json(client);
  }

  /**
   * @swagger
   * /clients/{id}:
   *   put:
   *     tags:
   *       - Clients
   *     summary: Update a client
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the client to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Client'
   *     responses:
   *       '200':
   *         description: Client updated
   *       '404':
   *         description: Client not found
   */
  public async update({ params, request, response }: HttpContextContract) {
    const client = await Client.findOrFail(params.id);
    const data = request.only(['clientName']);
    client.merge(data);
    await client.save();
    return response.json(client);
  }

  /**
   * @swagger
   * /clients/{id}:
   *   delete:
   *     tags:
   *       - Clients
   *     summary: Delete a client
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the client to delete
   *     responses:
   *       '204':
   *         description: Client deleted
   *       '404':
   *         description: Client not found
   */
  public async destroy({ params, response }: HttpContextContract) {
    const client = await Client.findOrFail(params.id);
    await client.delete();
    return response.status(204).send({});
  }
}
