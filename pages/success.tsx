import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SuccessPage = () => {
  const router = useRouter();
  const { userId, planId } = router.query;
  const [loading, setLoading] = useState(true);

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
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          // Aqui você pode exibir uma mensagem de sucesso para o cliente
        })
        .catch((err) => {
          setLoading(false);
          console.error('Erro ao atribuir a máquina:', err);
        });
    }
  }, [userId, planId]);

  if (loading) return <p>Atribuindo a máquina ao usuário...</p>;

  return <p>Máquina atribuída com sucesso!</p>;
};

export default SuccessPage;
