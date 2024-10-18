import { useRouter } from 'next/router';

const FailurePage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl">Pagamento Falhou!</h1>
        <p className="mt-4">Infelizmente, seu pagamento não foi processado. Tente novamente.</p>

        <button 
          onClick={() => router.push('/')} 
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Voltar para a Página Inicial
        </button>
      </div>
    </div>
  );
};

export default FailurePage;
