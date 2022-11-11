import {loadData} from '../'

describe('api', () => {
  it('should return json', async () => {
    const remote = await loadData()
    const local = require('./data.json')

    expect(remote).toEqual(local)
  })
})
