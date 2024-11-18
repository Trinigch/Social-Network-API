import { Router } from 'express';
const router = Router();
import  userRoutes from './routes/index.js';

router.use('/user', userRoutes);

router.use((_req, res) => {
  return res.send('Wrong route!');
});

export default router;
