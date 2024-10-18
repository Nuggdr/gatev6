import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Machine from '../../models/Machine'; // Certifique-se de que o caminho está correto

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect(); // Conecta ao MongoDB

    if (req.method === 'GET') {
        try {
            // Busca todas as máquinas no banco de dados
            const machines = await Machine.find({});
            // Retorna as máquinas em formato JSON
            res.status(200).json(machines);
        } catch (error) {
            console.error('Erro ao buscar máquinas:', error);
            res.status(500).json({ message: 'Erro ao buscar máquinas' });
        }
    } else if (req.method === 'POST') {
        const { ip, username, password } = req.body;

        try {
            // Verificação básica para garantir que os dados obrigatórios estão presentes
            if (!ip || !username || !password) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }

            // Cria uma nova instância de Machine com os dados recebidos
            const newMachine = new Machine({ ip, username, password });

            // Salva a nova máquina no banco de dados
            await newMachine.save();

            // Responde com sucesso
            res.status(201).json({ message: 'Máquina adicionada com sucesso!' });
        } catch (error) {
            console.error('Erro ao adicionar máquina:', error);
            res.status(500).json({ message: 'Erro ao adicionar máquina' });
        }
    } else {
        // Se o método não for GET ou POST, retorna um erro 405 (Método não permitido)
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
};

export default handler;
