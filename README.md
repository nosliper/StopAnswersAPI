## Simples API RESTful que fornece respostas para o jogo Stop (Adedonha)
A API foi desenvolvida usando **Cloud Functions** e **Firestore**, ambos serviços do Google Firebase em fase Beta, qualquer um pode fazer requisições GET para https://stopanswersapi.firebaseapp.com/api/answers/$LETRA. É possível filtrar para uma única categoria com o parâmetro de query **category**, case-sensitive. O resultado é um array JSON e os objetos tem as seguintes propriedades: letter, category e answer. As categorias são baseadas nas utilizadas pelo site stopots.com.br.
#### Ex: https://stopanswersapi.firebaseapp.com/api/answers/c?category=Líquido

### Categorias válidas:
 * Adjetivo
 * Animal
 * App ou site
 * Ator
 * Banda
 * Cantor
 * Carro
 * Capital
 * Celebridade
 * CEP
 * Cidade
 * Comida
 * Cor
 * Desenho animado
 * Eletro Eletrônico
 * Esporte
 * Esportista
 * Filme
 * Flor
 * FLV
 * Fruta
 * Game
 * Gentílico
 * Inseto
 * Instrumento Musical
 * JLR
 * Líquido
 * Marca
 * Música
 * MSÉ
 * Nome Feminino
 * Nome Masculino
 * Objeto
 * País
 * Palavra em inglês
 * PCH
 * PDA
 * Personagem Fictício
 * Profissão
 * Programa de TV
 * Série
 * Sobremesa
 * Sobrenome
 * Time esportivo
 * Verbo
 * Vestuário