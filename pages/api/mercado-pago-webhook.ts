import type { NextApiRequest, NextApiResponse } from 'next';
import mercadopago from 'mercadopago';
import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';
import Machine from '../../models/Machine';

mercadopago.configure({
  access_token: 'APP_USR-7757243395799799-101720-7dace157bdd88e3ed4eff645a686a947-820552196', // Use seu access token válido
});

const handleWebhook = async (req: NextApiRequest, res: NextApiResponse) => {
  const payment = req.body;

  try {
    // Verifica se o pagamento foi aprovado
    if (payment.type === 'payment' && payment.data.status === 'approved') {
      // Extrai o userId e planId do additional_info
      const additionalInfo = JSON.parse(payment.data.additional_info);
      const { userId, planId } = additionalInfo;

      // Conectar ao banco de dados
      await dbConnect();

      // Atribuir uma máquina disponível ao usuário com base no plano
      const machine = await Machine.findOne({ userId: null }); // Procura uma máquina não atribuída

      if (!machine) {
        return res.status(400).json({ error: 'Sem máquinas disponíveis' });
      }

      // Atualiza a máquina com o userId
      machine.userId = userId;
      await machine.save();

      // Você também pode atualizar o plano do usuário, se necessário
      await User.findByIdAndUpdate(userId, { planId });

      res.status(200).json({ success: true, message: 'Máquina atribuída com sucesso' });
    } else {
      res.status(400).json({ error: 'Pagamento não aprovado' });
    }
  } catch (error) {
    console.error('Erro no webhook do Mercado Pago:', error);
    res.status(500).json({ error: 'Erro ao processar o webhook' });
  }
};

export default handleWebhook;
