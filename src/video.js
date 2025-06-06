import { connect } from './db.js';
import Logger from './logger.js';
import { ObjectId } from 'mongodb';

class Video {
  constructor({ title, description, url, duration, uploadDate }) {
    this.title = title;
    this.description = description || '';
    this.url = url;
    this.duration = duration;
    this.uploadDate = uploadDate || new Date();
  }

  static collectionName = 'videos';

  validate() {
    if (!this.title || typeof this.title !== 'string' || this.title.trim() === '') {
      throw new Error('Título é obrigatório e deve ser uma string não vazia.');
    }
    if (!this.url || typeof this.url !== 'string' || this.url.trim() === '') {
      throw new Error('URL do vídeo é obrigatório e deve ser uma string não vazia.');
    }
    if (this.duration <= 0 || isNaN(this.duration)) {
      throw new Error('Duração do vídeo é obrigatória e deve ser um número positivo.');
    }
  }

  async save() {
    try {
      this.validate();
      const db = await connect();
      const result = await db.collection(Video.collectionName).insertOne({
        title: this.title,
        description: this.description,
        url: this.url,
        duration: this.duration,
        uploadDate: this.uploadDate,
      });
      return result.insertedId;
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }

  static async findByTitle(title) {
    try {
      if (!title) throw new Error('Título para busca deve ser informado.');
      const db = await connect();
      const videos = await db.collection(Video.collectionName)
        .find({ title: { $regex: new RegExp(title, 'i') } })
        .toArray();
      return videos;
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }

  static async findAll() {
    try {
      const db = await connect();
      return await db.collection(Video.collectionName).find({}).toArray();
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      if (!id) throw new Error('ID para deleção deve ser informado.');
      const db = await connect();
      const result = await db.collection(Video.collectionName).deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }

  static async insertMany(videosArray) {
  try {
    if (!Array.isArray(videosArray) || videosArray.length === 0) {
      throw new Error('Você deve passar uma lista de vídeos válida.');
    }

    // Validar individualmente cada vídeo
    videosArray.forEach(video => {
      if (!video.title || !video.url || typeof video.duration !== 'number') {
        throw new Error('Cada vídeo precisa de título, url e duração válidos.');
      }
    });

    const db = await connect();
    const result = await db.collection(Video.collectionName).insertMany(videosArray);
    return result.insertedCount;
  } catch (error) {
    Logger.logError(error);
    throw error;
  }
}

}


export default Video;
