import axios from 'axios'
export default class Result {
  constructor() {}

  async loadData() {
    try {
      const linkID = sessionStorage.getItem('ID')
      const res = axios(`${linkID}`)
      this.data = (await res).data
      console.log(this.data)
    } catch (error) {
      console.log(error)
    }
  }

  async moreData(data) {
    try {
      const res = axios(data['_links']['city:urban_area'].href)
      this.cityUrban = await res
      console.log(this.cityUrban)
      console.log(this.cityUrban.mayor)
    } catch (err) {
      console.log(err)
    }
  }

  async loadImages(data) {
    try {
      const res = axios(data['data']['_links']['ua:images'].href)
      this.imageLinks = await res
      console.log(this.imageLinks.data.photos[0].image.web)
    } catch (err) {
      console.log(err)
    }
  }
}
