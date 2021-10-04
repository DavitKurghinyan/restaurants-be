import { Model, DataTypes } from 'sequelize';
import db from '../services/db';

class Reviews extends Model {}

Reviews.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    restaurantId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'reviews',
    modelName: 'reviews',
  },
);

export default Reviews;
