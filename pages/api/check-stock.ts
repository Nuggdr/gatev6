// pages/api/check-stock.ts
import type { NextApiRequest, NextApiResponse } from 'next';

// Simulação de verificação de estoque
const stock = {
  1: 5, // 5 máquinas disponíveis para o plano 1
  // Adicione mais planos aqui, se necessário
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { planId } = req.body;

    if (stock[planId]) {
      res.status(200).json({ available: stock[planId] > 0 });
    } else {
      res.status(400).json({ error: 'Plano não encontrado' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
