import { useRouter } from 'next/router';

const FailurePage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl">Pagamento Falhou!</h1>
      <p className="mt-4">Infelizmente, seu pagamento não foi processado. Tente novamente.</p>
    </div>
  );
};

export default FailurePage;
