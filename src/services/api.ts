import axios from 'axios'

const loadData = async (): Promise<any> => {
  const json = await axios.get<string>('https://mocki.io/v1/10404696-fd43-4481-a7ed-f9369073252f')
  return json.data
}

export {loadData}
