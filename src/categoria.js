

import { connect } from './db.js';
import Logger from './logger.js';
import { ObjectId } from 'mongodb';

class Categoria {
  constructor({ nome, descricao }) {
    this.nome = nome;
    this.descricao = descricao || '';
  }

  static collectionName = 'categorias';

  validate() {
    if (!this.nome || typeof this.nome !== 'string' || this.nome.trim() === '') {
      throw new Error('Nome da categoria é obrigatório e deve ser uma string não vazia.');
    }
  }

  async save() {
    try {
      this.validate();
      const db = await connect();
      const result = await db.collection(Categoria.collectionName).insertOne({
        nome: this.nome,
        descricao: this.descricao,
      });
      return result.insertedId;
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }


  static async insertMany(listaDeCategorias) {
    try {
      if (!Array.isArray(listaDeCategorias) || listaDeCategorias.length === 0) {
        throw new Error("A lista de categorias para inserção não pode ser vazia.");
      }
      const db = await connect();
      const result = await db.collection(Categoria.collectionName).insertMany(listaDeCategorias);
      return result.insertedCount;
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }


  static async findByNome(nome) {
    try {
      if (!nome) throw new Error('Nome para busca deve ser informado.');
      const db = await connect();
      return await db.collection(Categoria.collectionName)
        .find({ nome: { $regex: new RegExp(nome, 'i') } })
        .toArray();
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }

  static async findAll() {
    try {
      const db = await connect();
      return await db.collection(Categoria.collectionName).find({}).toArray();
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      if (!id) throw new Error('ID para deleção deve ser informado.');
      const db = await connect();
      const result = await db.collection(Categoria.collectionName).deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }
}

export default Categoria;