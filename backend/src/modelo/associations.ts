import Cliente from './clienteModel';
import Pet from './petModel';
import Produto from './produtoModel';
import Servico from './servicoModel';
import Consumo from './consumoModel';

// Relações Cliente-Pet
Cliente.hasMany(Pet, { foreignKey: 'clienteId', as: 'pets' });
Pet.belongsTo(Cliente, { foreignKey: 'clienteId', as: 'dono' });

// Relações Cliente-Consumo
Cliente.hasMany(Consumo, { foreignKey: 'clienteId', as: 'consumos' });

// Relações Pet-Consumo
Pet.hasMany(Consumo, { foreignKey: 'petId', as: 'consumos' });

// Relações Produto-Consumo
Produto.hasMany(Consumo, { foreignKey: 'produtoId', as: 'consumos' });

// Relações Servico-Consumo
Servico.hasMany(Consumo, { foreignKey: 'servicoId', as: 'consumos' });

export default {
  Cliente,
  Pet,
  Produto,
  Servico,
  Consumo
}; 