import axios from 'axios'
export default class Result {
  constructor() {}

  async loadData() {
    try {
      const linkID = sessionStorage.getItem('ID')
      const res = axios(`${linkID}`)
      this.data = (await res).data
    } catch (error) {
      console.log(error)
    }
  }

  //FUNCTION TO CONFIRM IF SPECIFIC CITY HAS URBAN LINK
  checkLink(data) {
    if (data['_links']['city:urban_area']) {
      return true
    } else {
      return false
    }
  }

  // LOAD DATA FROM URBAN LINK
  async moreData(data) {
    try {
      const res = axios(data['_links']['city:urban_area'].href)
      this.cityUrban = await res
    } catch (err) {
      console.log(err)
    }
  }

  // LOAD IMAGES FROM URBAN LINK
  async loadImages(data) {
    try {
      const res = axios(data['data']['_links']['ua:images'].href)
      this.imageLinks = await res
    } catch (err) {
      console.log(err)
    }
  }

  // LOAD SCORES
  async loadScores(data) {
    try {
      const res = axios(data['data']['_links']['ua:scores'].href)
      this.cityScores = await res
    } catch (err) {
      console.log(err)
    }
  }

  // LOAD FINAL DETAILS
  async getGeneralInfo(data) {
    try {
      const res = axios(data['data']['_links']['ua:details'].href)
      this.cityGenInfo = await res
    } catch (err) {
      console.log(err)
    }
  }
}
