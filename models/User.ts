import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /.+\@.+\..+/ // Validação simples para o formato de email
    },
    machineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Machine' }, // Referência à máquina associada
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
