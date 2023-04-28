import baseService from './_baseService'

const pokemonsService = {
  ...baseService('pokemon'),
  getAll: function (limit = 20, offset = 0) {
    return this.http
      .get(`${this.endpoint}/?limit=${limit}&offset=${offset}`)
      .then((res) => res.data)
  }
}

export default pokemonsService
