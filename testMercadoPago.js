const mercadopago = require('mercadopago');

// Configuração do Mercado Pago
mercadopago.configure({
  access_token: 'APP_USR-7757243395799799-101720-7dace157bdd88e3ed4eff645a686a947-820552196', // Coloque seu token aqui
});

// Função para testar a configuração
async function testConfig() {
  try {
    console.log("Configurado com sucesso!");
  } catch (error) {
    console.error('Erro na configuração:', error);
  }
}

testConfig();
