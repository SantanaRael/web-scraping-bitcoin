const axios = require("axios");
const cheerio = require("cheerio");

async function getBTC() {
	try {
		// Fazer uma solicitação HTTP para o site
		const response = await axios.get(
			"https://www.google.com/finance/quote/BTC-BRL",
			{
				headers: {
					"User-Agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
				}
			}
		);

		// Carregar o HTML da resposta usando cheerio
		const $ = cheerio.load(response.data);

		// Array para armazenar os resultados
		const crypto = [];

		// Seleciona o elemento pai
		$(".kf1m0").each((index, element) => {
			const btc = $(element).find("div").text(); //encontrar o elemento que quero retirar a informação
            //console.log(element) //para ver se o elemento foi encontrado
			bitcoin = `R$ ${btc}`;

			// Adicionar os dados ao array
			crypto.push({
				bitcoin
			});
		});

		// Retornar o array de resultados
		return crypto;
	} catch (error) {
		console.error("Erro:", error.message);
		return []; // Retorna um array vazio em caso de erro
	}
}

// Chamar a função de scraping
getBTC().then((data) => {
	console.log(data);
});
