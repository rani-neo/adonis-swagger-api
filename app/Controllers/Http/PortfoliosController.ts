import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Portfolio from 'App/Models/Portfolio'
import Client from 'App/Models/Client'


/**
 * @swagger
 * components:
 *  schemas:
 *    Portfolio:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        portfolioName:
 *          type: string
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 */
export default class PortfolioController {

  /**
   * @swagger
   * /portfolios:
   *   get:
   *     tags:
   *       - Portfolios
   *     summary: List all portfolios
   *     responses:
   *       '200':
   *         description: Successful operation
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Portfolio'
   *       '500':
   *         description: Internal server error
   */
  public async index({ response }: HttpContextContract) {
    try {
     // const portfolios = await Portfolio.query().preload('clients');
     const portfolios = await Portfolio.query();
     return response.json(portfolios);
    } catch (error) {
      return response.status(500).json({ error: 'Failed to fetch portfolios' });
    }
  }

  /**
   * @swagger
   * /portfolios/{id}:
   *   get:
   *     tags:
   *       - Portfolios
   *     summary: Get specific portfolio by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the portfolio to return
   *     responses:
   *       '200':
   *         description: Successful operation
   *       '404':
   *         description: Portfolio not found
   */
  public async show({ params, response }: HttpContextContract) {
    try {

      //const portfolio = await Portfolio.query().preload('clients').where('id', params.id).firstOrFail();
      const portfolio = await Portfolio.query().where('id', params.id).firstOrFail();
      return response.json(portfolio);
    } catch (error) {
      return response.status(404).json({ error: 'Portfolio not found' });
    }
  }

  /**
   * @swagger
   * /portfolios:
   *   post:
   *     tags:
   *       - Portfolios
   *     summary: Create a new portfolio
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Portfolio'
   *     responses:
   *       '201':
   *         description: Portfolio created
   *       '500':
   *         description: Internal server error
   */
  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.only(['portfolioName']); 
      const portfolio = await Portfolio.create(data);
      return response.status(201).json(portfolio);
    } catch (error) {
      return response.status(500).json({ error: 'Failed to create portfolio' });
    }
  }
/**
 * @swagger
 * /add-client-to-portfolio:
 *   post:
 *     tags:
 *       - Portfolios
 *     summary: Add a client to a portfolio
 *     description: Attach a client to a specific portfolio using their IDs.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: number
 *                 description: ID of the client to be added to the portfolio.
 *               portfolioId:
 *                 type: number
 *                 description: ID of the portfolio to which the client will be added.
 *             required:
 *               - clientId
 *               - portfolioId
 *     responses:
 *       '200':
 *         description: Client added to portfolio successfully.
 *       '404':
 *         description: Client or Portfolio not found.
 *       '500':
 *         description: Failed to add client to portfolio.
 */

public async addClientToPortfolio({ request, response }: HttpContextContract) {
    try {
      const { clientId, portfolioId } = request.only(['clientId', 'portfolioId']);

      const portfolio = await Portfolio.findOrFail(portfolioId);
      const client = await Client.findOrFail(clientId);

      await portfolio.related('clients').save(client);
      
      return response.status(201).json({ message: 'Client added to portfolio', portfolio });

    } catch (error) {
      if (error.message.includes("E_ROW_NOT_FOUND")) {
        return response.status(404).json({
          error: 'Either the portfolio or client was not found',
          inputData: request.all()
        });
      }

      return response.status(500).json({
        error: 'Failed to add client to portfolio',
        details: error.message,
        inputData: request.all()
      });
    }
}


  /**
   * @swagger
   * /portfolios/{id}:
   *   put:
   *     tags:
   *       - Portfolios
   *     summary: Update a portfolio
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the portfolio to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Portfolio'
   *     responses:
   *       '200':
   *         description: Portfolio updated
   *       '404':
   *         description: Portfolio not found
   */
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const portfolio = await Portfolio.findOrFail(params.id);
      const data = request.only(['portfolioName']); 
      portfolio.merge(data);
      await portfolio.save();
      return response.json(portfolio);
    } catch (error) {
      return response.status(404).json({ error: 'Portfolio not found' });
    }
  }

  /**
   * @swagger
   * /portfolios/{id}:
   *   delete:
   *     tags:
   *       - Portfolios
   *     summary: Delete a portfolio
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the portfolio to delete
   *     responses:
   *       '204':
   *         description: Portfolio deleted
   *       '404':
   *         description: Portfolio not found
   */
  public async destroy({ params, response }: HttpContextContract) {
    try {
      const portfolio = await Portfolio.findOrFail(params.id);
      await portfolio.delete();
      return response.status(204).send({});
    } catch (error) {
      return response.status(404).json({ error: 'Portfolio not found' });
    }
  }
}
