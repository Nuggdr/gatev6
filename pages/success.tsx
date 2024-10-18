import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SuccessPage = () => {
  const router = useRouter();
  const { userId, planId } = router.query;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Para armazenar possíveis erros

  useEffect(() => {
    if (userId && planId) {
      // Chamar a API para atribuir a máquina ao usuário
      fetch('/api/assign-machine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, planId }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Erro na atribuição da máquina');
          }
          return res.json();
        })
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message); // Armazena a mensagem de erro
          console.error('Erro ao atribuir a máquina:', err);
        });
    }
  }, [userId, planId]);

  if (loading) return <p>Atribuindo a máquina ao usuário...</p>;
  
  if (error) return <p>Ocorreu um erro: {error}</p>; // Exibe mensagem de erro, se houver

  return <p>Máquina atribuída com sucesso!</p>;
};

export default SuccessPage;
