

import { connect } from './db.js';
import Logger from './logger.js';
import { ObjectId } from 'mongodb';

class Usuario {
  constructor({ nome, email, idade }) {
    this.nome = nome;
    this.email = email;
    this.idade = idade;
  }

  static collectionName = 'usuarios';

  validate() {
    if (!this.nome || typeof this.nome !== 'string' || this.nome.trim() === '') {
      throw new Error('Nome é obrigatório e deve ser uma string não vazia.');
    }
    if (!this.email || typeof this.email !== 'string' || !this.email.includes('@')) {
      throw new Error('Email válido é obrigatório.');
    }
    if (!this.idade || typeof this.idade !== 'number' || this.idade <= 0) {
      throw new Error('Idade deve ser um número positivo.');
    }
  }

  async save() {
    try {
      this.validate();
      const db = await connect();
      const result = await db.collection(Usuario.collectionName).insertOne({
        nome: this.nome,
        email: this.email,
        idade: this.idade,
      });
      return result.insertedId;
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }

  static async insertMany(listaDeUsuarios) {
    try {
      if (!Array.isArray(listaDeUsuarios) || listaDeUsuarios.length === 0) {
        throw new Error("A lista de usuários para inserção não pode ser vazia.");
      }
      const db = await connect();
      const result = await db.collection(Usuario.collectionName).insertMany(listaDeUsuarios);
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
      return await db.collection(Usuario.collectionName)
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
      return await db.collection(Usuario.collectionName).find({}).toArray();
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      if (!id) throw new Error('ID para deleção deve ser informado.');
      const db = await connect();
      const result = await db.collection(Usuario.collectionName).deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }
}

export default Usuario;