import mongoose from 'mongoose';

const connection = { isConnected: false };

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const mongodbUri = process.env.MONGODB_URI;

  if (!mongodbUri) {
    throw new Error('A variável de ambiente MONGODB_URI não está definida.');
  }

  try {
    const db = await mongoose.connect(mongodbUri, {
      
    });

    connection.isConnected = db.connection.readyState === 1; // 1 significa conectado
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

export default dbConnect;
