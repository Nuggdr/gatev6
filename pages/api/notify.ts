import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';
import Machine from '../../models/Machine';

const handleNotification = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { id, userId, planId } = req.body;

    // Conectar ao banco de dados
    await dbConnect();

    // Marcar a máquina como associada ao usuário
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Obter uma máquina disponível e associá-la ao usuário
    const machine = await Machine.findOne({ isAvailable: true });
    if (machine) {
      user.machineId = machine._id;
      machine.isAvailable = false; // Marcar a máquina como não disponível
      await user.save();
      await machine.save();
      return res.status(200).json({ success: true });
    } else {
      return res.status(404).json({ error: 'Nenhuma máquina disponível' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handleNotification;
