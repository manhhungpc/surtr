import { Router } from 'express';
import { getUserById } from '../controllers/UserController';

const userRoute = Router();

userRoute.get('/:userId', getUserById);

export default userRoute;
