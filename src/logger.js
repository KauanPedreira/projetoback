import fs from 'fs';
import path from 'path';

class Logger {
  constructor() {
    this.logFile = path.resolve('logs/errors.log');
  }

  logError(error) {
    const timestamp = new Date().toISOString();
    const message = `[${timestamp}] ${error.stack || error}\n\n`;
    fs.appendFile(this.logFile, message, (err) => {
      if (err) console.error('Falha ao salvar log:', err);
    });
  }
}

export default new Logger();
