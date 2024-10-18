import type { NextApiRequest, NextApiResponse } from 'next';
import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: 'APP_USR-7757243395799799-101720-7dace157bdd88e3ed4eff645a686a947-820552196', // Use um token válido
});

const handlePayment = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { planId, userId } = req.body;

    const preference = {
      items: [
        {
          title: `Plano ${planId}`,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: 1, // Preço fixo para o exemplo
        },
      ],
      back_urls: {
        success: `http://localhost:3000/success?userId=${userId}&planId=${planId}`, // Localhost para ambiente de desenvolvimento
        failure: `http://localhost:3000/failure`,
        pending: `http://localhost:3000/pending`,
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_types: [{ id: 'ticket' }], // Exclui pagamento por boleto
        installments: 1, // Limita a 1 parcela
        default_payment_method_id: 'pix', // Define o PIX como método de pagamento padrão
      },
      additional_info: JSON.stringify({
        userId, // Informações adicionais enviadas no pagamento
        planId,
      }),
      notification_url: 'https://seu-dominio.com/api/mercado-pago-webhook', // URL para o Webhook de notificação
    };

    try {
      const response = await mercadopago.preferences.create(preference);
      res.status(200).json({ link: response.body.init_point }); // Retorna o link de pagamento
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao criar preferência:', (error as any)?.response?.data || error.message);
      } else {
        console.error('Erro desconhecido', error);
      }
      res.status(500).json({ error: 'Erro ao processar o pagamento' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handlePayment;
