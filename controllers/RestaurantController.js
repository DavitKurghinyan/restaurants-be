/*
 * Restaurants Controller
 */

import { Restaurant, Reviews } from '../models';
import Validate from '../services/validate';

class RestaurantController {
  /**
   * get all restaurants sorted by rate
   * @param req
   * @param res
   * @param next
   * @returns {Promise<void>}
   */
  static allRestaurant = async (req, res, next) => {
    try {
      const restaurant = await Restaurant.findAll({
        order: [['rate', 'DESC']],
      });

      res.json({
        status: 'ok',
        result: restaurant || [],
      });
    } catch (e) {
      next(e);
    }
  };

  /**
   * get single restaurant by ID
   * @param req
   * @param res
   * @param next
   * @returns {Promise<void>}
   */
  static singleRestaurant = async (req, res, next) => {
    try {
      await Validate(req.query, {
        id: 'required|integer',
      });

      const { id } = req.query;

      const restaurant = await Restaurant.findOne({
        where: {
          id,
        },
      });

      res.json({
        status: 'ok',
        result: restaurant || [],
      });
    } catch (e) {
      next(e);
    }
  };

  /**
   * get reviews by restaurant  ID
   * @param req
   * @param res
   * @param next
   * @returns {Promise<void>}
   */
  static singleRestaurantReviews = async (req, res, next) => {
    try {
      const { restaurantId } = req.query;

      const reviews = await Reviews.findAll({
        where: {
          restaurantId,
        },
      });

      res.json({
        status: 'ok',
        msg: 'Get Reviews',
        result: reviews || [],
      });
    } catch (e) {
      next(e);
    }
  };

  /**
   * update restaurant rate
   * @param req
   * @param res
   * @param next
   * @returns {Promise<void>}
   */
  static updateRate = async (req, res, next) => {
    try {
      await Validate(req.body, {
        id: 'required|integer',
      });

      const { id, rate } = req.body;

      const restaurant = await Restaurant.update(
        {
          rate,
        },
        {
          where: {
            id,
          },
        },
      );

      res.json({
        status: 'ok',
        msg: 'Updated',
        result: restaurant,
      });
    } catch (e) {
      next(e);
    }
  };

  /**
   * add review to the restaurant
   * @param req
   * @param res
   * @param next
   * @returns {Promise<void>}
   */
  static leaveFeedback = async (req, res, next) => {
    try {
      await Validate(req.body, {
        description: 'required|string',
        restaurantId: 'required|integer|min:0',
        userId: 'required|integer|min:0',
      });

      const { description, restaurantId, userId } = req.body;

      const review = await Reviews.create({
        description,
        restaurantId,
        userId,
      });

      res.json({
        status: 'ok',
        result: review,
      });
    } catch (e) {
      next(e);
    }
  };
}

export default RestaurantController;
