import {Vertex, NodeVertex} from './'

class Dijkstra {
  vertices: any
  constructor() {
    this.vertices = {}
  }

  addVertex(vertex: Vertex): void {
    this.vertices[vertex.nameOfVertex] = vertex
  }

  findPointsOfShortestWay(start: string, finish: string): string[] {
    let nextVertex: string = finish
    let arrayWithVertex: string[] = []
    while (nextVertex !== start) {
      let minWeigth: number = Number.MAX_VALUE
      let minVertex: string = ''
      for (let i of this.vertices[nextVertex].nodes) {
        if (i.weight + this.vertices[i.nameOfVertex].weight < minWeigth) {
          minWeigth = this.vertices[i.nameOfVertex].weight
          minVertex = i.nameOfVertex
        }
      }
      arrayWithVertex.push(minVertex)
      nextVertex = minVertex
    }
    return arrayWithVertex
  }

  findShortestWay(start: string, finish: string): string[] {
    if (start === finish) {
      return ['starting point and collection cannot be the same']
    }

    let nodes: any = {}
    let visitedVertex: string[] = []

    for (let i in this.vertices) {
      if (this.vertices[i].nameOfVertex === start) {
        this.vertices[i].weight = 0
      } else {
        this.vertices[i].weight = Number.MAX_VALUE
      }
      nodes[this.vertices[i].nameOfVertex] = this.vertices[i].weight
    }

    while (Object.keys(nodes).length !== 0) {
      let sortedVisitedByWeight: string[] = Object.keys(nodes).sort(
        (a, b) => this.vertices[a].weight - this.vertices[b].weight,
      )
      let currentVertex: Vertex = this.vertices[sortedVisitedByWeight[0]]
      if (currentVertex) {
        for (let j of currentVertex.nodes) {
          const calculateWeight: number = currentVertex.weight + j.weight
          if (calculateWeight < this.vertices[j.nameOfVertex].weight) {
            this.vertices[j.nameOfVertex].weight = calculateWeight
          }
        }
      }
      delete nodes[sortedVisitedByWeight[0]]
    }
    const finishWeight: number = this.vertices[finish].weight
    let arrayWithVertex: string[] = this.findPointsOfShortestWay(start, finish).reverse()
    arrayWithVertex.push(finish, finishWeight.toString())
    return arrayWithVertex
  }

  loadVertex(data: any): void {
    Object.keys(data).map(element => {
      let nodes: NodeVertex[] = Object.keys(data[element as keyof typeof data]).map(item => {
        return new NodeVertex(item, data[element as keyof typeof data][item])
      })
      this.addVertex(new Vertex(element, nodes))
    })
  }
}

export {Dijkstra}
