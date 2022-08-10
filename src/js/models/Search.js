import axios from 'axios'
export default class Search {
  constructor(query) {
    this.query = query
  }
  async getCity() {
    try {
      const res = axios(
        `https://api.teleport.org/api/cities/?search=${this.query}`,
      )
      this.results = (await res).data
    } catch (error) {
      console.log(error)
    }
  }
}
