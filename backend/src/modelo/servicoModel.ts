import { DataTypes, Model } from 'sequelize';
import sequelize from './db';

export class Servico extends Model {
  public id!: number;
  public nome!: string;
  public preco!: number;
  public tipo!: string;
}

Servico.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Servico'
});

export default Servico; 