import { Router } from 'express';
import userRoute from './UserRouter';

const router = Router();

router.use('/users', userRoute);

export default router;
