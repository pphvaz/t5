import { DataTypes, Model } from 'sequelize';
import sequelize from './db';

export class Produto extends Model {
  public id!: number;
  public nome!: string;
  public preco!: number;
  public quantidade!: number;
}

Produto.init({
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
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Produto'
});

export default Produto; 