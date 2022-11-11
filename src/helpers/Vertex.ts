import {NodeVertex} from './'

class Vertex {
  nameOfVertex: string
  nodes: NodeVertex[]
  weight: number

  constructor(nameOfVertex: string, nodes: NodeVertex[], weight: number = 0) {
    this.nameOfVertex = nameOfVertex
    this.nodes = nodes
    this.weight = weight
  }
}

export {Vertex}
