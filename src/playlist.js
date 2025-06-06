// ./src/Playlist.js

import { connect } from './db.js';
import Logger from './logger.js';
import { ObjectId } from 'mongodb';

class Playlist {
  constructor({ nome, descricao, usuarioId, videos = [] }) {
    this.nome = nome;
    this.descricao = descricao || '';
    this.usuarioId = new ObjectId(usuarioId);
    this.videos = videos.map(id => new ObjectId(id)); 
    this.dataCriacao = new Date();
  }

  static collectionName = 'playlists';

  async save() {
    try {
      if (!this.nome) throw new Error("Nome da playlist é obrigatório.");
      if (!this.usuarioId) throw new Error("A playlist precisa ter um dono (usuário).");

      const db = await connect();
      const result = await db.collection(Playlist.collectionName).insertOne(this);
      return result.insertedId;
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }

  static async insertMany(listaDePlaylists) {
    try {
        if (!Array.isArray(listaDePlaylists) || listaDePlaylists.length === 0) {
            throw new Error("A lista de playlists para inserção não pode ser vazia.");
        }
        const playlistsFormatadas = listaDePlaylists.map(p => new Playlist(p));
        
        const db = await connect();
        const result = await db.collection(Playlist.collectionName).insertMany(playlistsFormatadas);
        return result.insertedCount;
    } catch (error) {
        Logger.logError(error);
        throw error;
    }
  }

  static async addVideo(playlistId, videoId) {
    try {
      const db = await connect();
      const result = await db.collection(Playlist.collectionName).updateOne(
        { _id: new ObjectId(playlistId) },
        { $addToSet: { videos: new ObjectId(videoId) } }
      );
      return result.modifiedCount > 0;
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }

  static async removeVideo(playlistId, videoId) {
    try {
        const db = await connect();
        const result = await db.collection(Playlist.collectionName).updateOne(
            { _id: new ObjectId(playlistId) },
            { $pull: { videos: new ObjectId(videoId) } }
        );
        return result.modifiedCount > 0;
    } catch (error) {
        Logger.logError(error);
        throw error;
    }
  }

  static async findByUser(usuarioId) {
    try {
      const db = await connect();
      return await db.collection(Playlist.collectionName)
        .find({ usuarioId: new ObjectId(usuarioId) })
        .project({ nome: 1, descricao: 1, dataCriacao: 1 })
        .toArray();
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }
  
  static async findByIdWithVideos(playlistId) {
    try {
        const db = await connect();
        const pipeline = [
            { $match: { _id: new ObjectId(playlistId) } },
            { 
                $lookup: {
                    from: 'videos',
                    localField: 'videos',
                    foreignField: '_id',
                    as: 'listaDeVideos'
                }
            }
        ];
        const result = await db.collection(Playlist.collectionName).aggregate(pipeline).toArray();
        return result[0];
    } catch (error) {
        Logger.logError(error);
        throw error;
    }
  }

  static async deleteById(id) {
    try {
      const db = await connect();
      const result = await db.collection(Playlist.collectionName).deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }
}

export default Playlist;