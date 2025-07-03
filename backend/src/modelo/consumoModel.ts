import { DataTypes, Model } from 'sequelize';
import sequelize from './db';
import Cliente from './clienteModel';
import Pet from './petModel';
import Produto from './produtoModel';
import Servico from './servicoModel';

export class Consumo extends Model {
  public id!: number;
  public clienteId!: number;
  public petId!: number;
  public tipo!: 'produto' | 'servico';
  public produtoId?: number;
  public servicoId?: number;
  public quantidade!: number;
  public data!: Date;
  public valor!: number;
}

Consumo.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Cliente, key: 'id' }
  },
  petId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Pet, key: 'id' }
  },
  tipo: {
    type: DataTypes.ENUM('produto', 'servico'),
    allowNull: false
  },
  produtoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: Produto, key: 'id' }
  },
  servicoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: Servico, key: 'id' }
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Consumo'
});

Consumo.belongsTo(Cliente, { foreignKey: 'clienteId', as: 'cliente' });
Consumo.belongsTo(Pet, { foreignKey: 'petId', as: 'pet' });
Consumo.belongsTo(Produto, { foreignKey: 'produtoId', as: 'produto' });
Consumo.belongsTo(Servico, { foreignKey: 'servicoId', as: 'servico' });

export default Consumo; 