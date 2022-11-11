import {Dijkstra, NodeVertex, Vertex} from '../'
import {loadData} from '../../services/api'
// importa e configura o dotenv
import dotenv from 'dotenv'
dotenv.config()

describe('Dijkstra', () => {
  it('should return the shortest way', async () => {
    const data = await loadData()

    const dijkstra = new Dijkstra()
    dijkstra.loadVertex(data)

    const start = 'A1'
    const colect = 'G4'
    const end = 'F8'

    const teste1 = dijkstra.findShortestWay(start, colect)
    const teste2 = dijkstra.findShortestWay(colect, end)

    const result = `Coletar: ${teste1} \r\nEntregar: ${teste2}`
    expect(result).toBe('Coletar: A1,A2,A3,B3,B4,C4,D4,E4,F4,G4,138.82 \r\nEntregar: G4,G5,F5,F6,F7,F8,84.39')
  })

  it('starting point and collection cannot be the same', async () => {
    const start = 'A5'
    const collect = 'A5'

    const data = await loadData()

    const dijkstra = new Dijkstra()
    dijkstra.loadVertex(data)

    const result = dijkstra.findShortestWay(start, collect)
    expect(result[0]).toBe('starting point and collection cannot be the same')
  })

  it('should import vertex', async () => {
    const data = await loadData()

    const dijkstra = new Dijkstra()
    dijkstra.loadVertex(data)

    const vertex = dijkstra.vertices['A8']
    expect(vertex.nameOfVertex).toBe('A8')
  })
})
