import { DataTypes, Model } from 'sequelize';
import sequelize from './db';

export class Cliente extends Model {
  public id!: number;
  public nome!: string;
  public cpf!: string;
  public rg!: string;
  public telefone!: string;
  public dataCadastro!: Date;
}

Cliente.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  rg: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dataCadastro: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Cliente'
});

export default Cliente; 