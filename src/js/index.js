import Search from './models/Search'
import * as searchView from './views/searchView'
import { UI } from './base'
import Result from './models/Result'
import * as resultView from './views/resultview'

// Creata app state

const state = {}

//Search controller
if (UI.mainPage) {
  const showRes = async () => {
    const query = searchView.getInput()
    if (query.length >= 1) {
      try {
        //   CREATE NEW INSTANCE
        state.city = new Search(query)
        await state.city.getCity()

        // CLEAR PREVIOUS SEARCH
        searchView.clearDomRes()

        if (state.city.results) {
          // DISPLAY IN UI
          searchView.prepareDom()
          const suggestions =
            state.city.results._embedded['city:search-results']
          searchView.displaySuggestions(suggestions)
        }
      } catch (error) {
        console.log(error)
      }
    } else if (query.length < 1) {
      //   Clear results
      searchView.clearDom()
      searchView.clearDomRes()
    }
  }
  const clearResult = () => {
    // CLEAR PREVIOUS SEARCH
    searchView.clearDom()
    searchView.clearDomRes()
  }
  UI.inputField.addEventListener('input', showRes)
  // added during production
  //UI.inputField.addEventListener('change', clearResult)
}
// RESULT CONTROLLER

if (UI.resultPage) {
  const displayDetails = async () => {
    try {
      state.cityDetails = new Result()
      await state.cityDetails.loadData()
      await state.cityDetails.moreData(state.cityDetails.data)
      await state.cityDetails.loadImages(state.cityDetails.cityUrban)
      // LOAD DATA TO UI
      resultView.removeLoader()
      resultView.fillData(
        state.cityDetails.data,
        state.cityDetails.cityUrban,
        state.cityDetails.imageLinks,
      )
    } catch (err) {
      console.log(err)
    }
    //
  }
  window.addEventListener('load', displayDetails)
}
