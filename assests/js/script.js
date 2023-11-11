$(document).ready(function() {

    $(".btn-primary").click(async function() {
        var moedaOrigem  = $("#moedaOrigem").val();
        var moedaDestino = $("#moedaDestino").val();
        var quantidade   = $("#quantidade").val();

        console.log('quanti: '+quantidade)

        var url = 'http://economia.awesomeapi.com.br/json/last/'+moedaOrigem+'-'+moedaDestino;

        var busca = await fetch(url, {method: "GET"});
        var dados = await busca.json();

         // Verifica se a resposta contém dados válidos
         if (dados[moedaOrigem + moedaDestino]) {
            var taxaDeCambio = dados[moedaOrigem + moedaDestino].high;
            var resultado = quantidade * taxaDeCambio;

            // Mostra o resultado na div 'resultado'
            $("#resultado").text(`${quantidade} ${moedaOrigem} é aproximadamente ${resultado.toFixed(2)} ${moedaDestino}`);
        } else {
            $("#resultado").text('Erro ao obter dados de conversão.');
        } 
    });

})

//idioma
function traduzir(idioma) {
    // Obtém o conteúdo da página
    const conteudo = $('body').text();

    
    const chaveAPI = 'AIzaSyDy46SP0VW556FwADN9JtZf5MSSFhfru2M';
  
    // Chama a API da Google Cloud Translation para tradução
    $.ajax({
      url: `https://translation.googleapis.com/language/translate/v2?key=${chaveAPI}`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        q: conteudo,
        source: 'auto', // Detectar automaticamente o idioma de origem
        target: idioma,
      }),
      success: function(data) {
        // Atualiza o conteúdo da página com o texto traduzido
        $('body').text(data.data.translations[0].translatedText);
      },
      error: function(error) {
        console.error('Erro na tradução:', error);
      }
    });
  }
