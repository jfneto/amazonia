import express, {Express, Request, Response} from 'express'
import dotenv from 'dotenv'
import {loadData} from './services/'
import {Dijkstra} from './helpers'
import path from 'path'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3001

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// initiliaze body-parser to parse incoming parameters requests to req.body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// static path
app.use('/', express.static(path.resolve(`${__dirname}/assets`)))

app.get('/', async (req: Request, res: Response) => {
  res.render('index', {title: 'Desafio Ateliware 2022'})
})

app.post('/rota', async (req: Request, res: Response) => {
  const start_letter = req.body['start-letter'] as string
  const start_number = req.body['start-number'] as string

  const collect_letter = req.body['collect-letter'] as string
  const collect_number = req.body['collect-number'] as string

  const end_letter = req.body['end-letter'] as string
  const end_number = req.body['end-number'] as string

  if (!start_letter || !start_number || !collect_letter || !collect_number || !end_letter || !end_number) {
    res.render('index', {
      title: 'Desafio Ateliware 2022',
      error: 'Todos os campos são obrigatórios',
    })
    return
  }

  if (start_letter + start_number === collect_letter + collect_number) {
    res.render('index', {
      title: 'Desafio Ateliware 2022',
      error: 'A posição de coleta não pode ser igual a posição de partida',
    })
    return
  }

  if (collect_letter + collect_number === end_letter + end_number) {
    res.render('index', {
      title: 'Desafio Ateliware 2022',
      error: 'A posição de entrega não pode ser igual a posição de coleta',
    })
    return
  }

  const data = await loadData()

  const dijkstra = new Dijkstra()
  dijkstra.loadVertex(data)

  // rota para coleta
  const route_to_collect = dijkstra.findShortestWay(
    `${start_letter}${start_number}`,
    `${collect_letter}${collect_number}`,
  )
  // rota para entrega
  const route_to_deliver = dijkstra.findShortestWay(`${collect_letter}${collect_number}`, `${end_letter}${end_number}`)

  // tempo total
  const total =
    Number(route_to_collect[route_to_collect.length - 1]) + Number(route_to_deliver[route_to_deliver.length - 1])

  // remove o tempo da rota depois de calcular o tempo total
  route_to_collect.splice(-1)
  route_to_deliver.splice(-1)

  // clona as rotas para poder remover apenas o inicio da rota de entrega e não ficar duplicado
  const temp = [...route_to_deliver]
  temp.splice(0, 1)

  // rota completa
  const full_route = [...route_to_collect, ...temp]

  res.render('result', {
    title: 'Desafio Ateliware 2022',
    start: route_to_collect,
    end: route_to_deliver,
    total: total,
    full_route: full_route,
  })
})

app.listen(port, () => {
  console.log(`ouvindo a porta:${port}`)
})
