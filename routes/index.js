import express from 'express';

import restaurant from './restaurant';

const router = express.Router();

router.use('/restaurants', restaurant);

export default router;
