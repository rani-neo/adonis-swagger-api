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
   *     summary: Get user by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of user to fetch
   *     responses:
   *       '200':
   *         description: Successful operation
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
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
   *     summary: Create a new user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       '201':
   *         description: User created successfully
   */
  public async store({ request, response }: HttpContextContract) {
    const user = new User()
    // Assign properties from request to the user model and save
    // Example: user.name = request.input('name')
    await user.save()
    return response.status(201).json(user)
  }

  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     tags:
   *       - Users
   *     summary: Update an existing user
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of user to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       '200':
   *         description: User updated successfully
   */
  public async update({ params, request, response }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
      return response.status(404).send({ message: 'User not found' })
    }
    // Update properties from request
    // Example: user.name = request.input('name')
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
   *         description: ID of user to delete
   *     responses:
   *       '204':
   *         description: User deleted successfully
   */
  public async destroy({ params, response }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
      return response.status(404).send({ message: 'User not found' })
    }
    await user.delete()
    return response.status(204).send()
  }
}
