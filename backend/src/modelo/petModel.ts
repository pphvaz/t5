import { DataTypes, Model } from 'sequelize';
import sequelize from './db';

export class Pet extends Model {
  public id!: number;
  public nome!: string;
  public tipo!: string;
  public raca!: string;
  public genero!: string;
  public clienteId!: number;
}

Pet.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  raca: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false
  },
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Pet'
});

export default Pet; 