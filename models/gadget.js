import { DataTypes } from 'sequelize';
import { sequelize } from './index.js'; // Adjust the path if necessary

const Gadget = sequelize.define('Gadget', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['Available', 'Deployed', 'Destroyed', 'Decommissioned'],
      defaultValue: 'Available',
    },
    codename: {
      type: DataTypes.STRING,
      unique: true,
    },
    decommissionedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
  
export default Gadget;