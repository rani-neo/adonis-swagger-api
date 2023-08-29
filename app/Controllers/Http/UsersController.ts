import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {

  /**
   * @swagger
   * /users:
   *   get:
   *     tags:
   *       - Users
   *     summary: List all users
   *     responses:
   *       '200':
   *         description: Successful operation
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   */
  public async index({ response }: HttpContextContract) {
    const users = await User.all()
    return response.json(users)
  }

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     tags:
   *       - Users
   *     summary: Get a user by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the user to return
   *     responses:
   *       '200':
   *         description: Successful operation
   *       '404':
   *         description: User not found
   */
  public async show({ params, response }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
      return response.status(404).send({ message: 'User not found' })
    }
    return response.json(user)
  }

  /**
   * @swagger
   * /users:
   *   post:
   *     tags:
   *       - Users
   *     summary: Create a user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               first_name:
   *                 type: string
   *               last_name:
   *                 type: string
   *               phone_number:
   *                 type: string
   *             required:
   *               - first_name
   *               - last_name
   *     responses:
   *       '201':
   *         description: User created
   */
  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['firstName', 'lastName', 'phoneNumber'])
    const user = await User.create(data)
    return response.status(201).json(user)
  }

  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     tags:
   *       - Users
   *     summary: Update a user
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the user to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               first_name:
   *                 type: string
   *               last_name:
   *                 type: string
   *               phone_number:
   *                 type: string
   *     responses:
   *       '200':
   *         description: User updated
   *       '404':
   *         description: User not found
   */
  public async update({ params, request, response }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
      return response.status(404).send({ message: 'User not found' })
    }
    const data = request.only(['firstName', 'lastName', 'phoneNumber'])
    user.merge(data)
    await user.save()
    return response.json(user)
  }

  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     tags:
   *       - Users
   *     summary: Delete a user
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the user to delete
   *     responses:
   *       '204':
   *         description: User deleted
   *       '404':
   *         description: User not found
   */
  public async destroy({ params, response }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
      return response.status(404).send({ message: 'User not found' })
    }
    await user.delete()
    return response.status(204).send({})
  }
}
