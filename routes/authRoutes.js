import express from 'express';
import { loginController, registerController } from '../controllers/authController.js';
import rateLimit from 'express-rate-limit';

//IP limitor
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

//router obj
const router = express.Router();

// routes

/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       required:
 *         - name
 *         - lastName
 *         - email
 *         - password
 *         - location
 *       properties:
 *         id:
 *           type: string
 *           description: The Auto-generated id of user collection
 *         name:
 *           type: string
 *           description: User Name
 *         lastName:
 *           type: string
 *           description: user Last Name
 *         email:
 *           type: string
 *           description: User Email
 *         password:
 *           type: string
 *           description: User password
 *         location:
 *           type: string
 *           description: location city or country
 *       example:
 *         id: GJHHJHJ365436463
 *         name: John
 *         lastName: Doe
 *         email: johndoe@gmail.com
 *         password: test@134567
 *         location: Mumbai
 */


/**
 * @swagger
 * tags:
 *   name: auth
 *   description: Authentication API
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register new user
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       500:
 *         description: Internal server error
 */

//REGISTER || POST
router.post('/register', limiter, registerController)

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       500:
 *         description: Internal server error
 */

//LOGIN || POST
router.post('/login', limiter, loginController)

export default router;