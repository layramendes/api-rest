import express from 'express'

const app = express()

// indicar para o express ler body com json
app.use(express.json())

// mock
const selecoes = [
  {id: 1, selecao: 'Brasil', grupo: 'G'},
  {id: 2, selecao: 'Argentina', grupo: 'G'},
  {id: 3, selecao: 'Alemanha', grupo: 'E'},
  {id: 4, selecao: 'França', grupo: 'E'},
  {id: 5, selecao: 'Uruguai', grupo: 'H'},
  {id: 6, selecao: 'Portugal', grupo: 'H'},
  {id: 7, selecao: 'Espanha', grupo: 'F'},
  {id: 8, selecao: 'Itália', grupo: 'F'},
  {id: 9, selecao: 'Inglaterra', grupo: 'F'},
  {id: 10, selecao: 'Estados Unidos', grupo: 'F'}
]

function buscarSelecaoPorId(id) {
  return selecoes.filter(selecao => selecao.id == id)
}

// pegar a posição ou index do elemento do array
function buscarIndexSelecao(id){
  return selecoes.findIndex(selecao => selecao.id == id)
}

// criar rota padrão ou raiz
app.get('/', (req, res) => {
  res.send('Curso de Node JS')
})

app.get('/selecoes', (req, res) => {
  res.status(200).send(selecoes)
})

app.get('/selecoes/:id', (req, res) => {
  res.json(buscarSelecaoPorId(req.params.id))
})

app.post('/selecoes', (req, res) => {
  selecoes.push(req.body)
  res.status(201).send('Seleção cadastrada com sucesso!')
})

app.delete('/selecoes/:id', (req, res) => {
  let index = buscarIndexSelecao(req.params.id)
  selecoes.splice(index, 1)
  res.send(`Seleção com id ${req.params.id} excluída com sucesso!`)
})

app.put('/selecoes/:id', (req, res) => {
  let index = buscarIndexSelecao(req.params.id)
  selecoes[index].selecao = req.body.selecao
  selecoes[index].grupo = req.body.grupo
  res.json(selecoes)
})

export default app
