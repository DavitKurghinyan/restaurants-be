import express from 'express';

import RestaurantController from '../controllers/RestaurantController';

const router = express.Router();

router.get('/all', RestaurantController.allRestaurant);
router.get('/single', RestaurantController.singleRestaurant);
router.get('/reviews', RestaurantController.singleRestaurantReviews);

router.put('/rate', RestaurantController.updateRate);
router.put('/feedBack', RestaurantController.leaveFeedback);

export default router;
