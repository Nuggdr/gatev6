import { useRouter } from 'next/router';

const FailurePage = () => {
  const router = useRouter();

  const handleRetry = () => {
    // Redireciona o usuário para a página inicial ou outra página desejada
    router.push('/'); // Você pode mudar para a rota que desejar
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl">Pagamento Falhou!</h1>
      <p className="mt-4">Infelizmente, seu pagamento não foi processado. Tente novamente.</p>
      <button onClick={handleRetry} className="mt-4 bg-blue-500 text-white p-2 rounded">
        Tentar Novamente
      </button>
    </div>
  );
};

export default FailurePage;
