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
      //LOAD CITY DETAILS LINK FROM SESSION STORAGE BY CALLING loadData()//
      state.cityDetails = new Result()
      await state.cityDetails.loadData()

      // CHECK IF DETAILS HAS CITY-URBAN LINK & CALL URBAN CITY METHODS
      if (state.cityDetails.checkLink(state.cityDetails.data)) {
        await state.cityDetails.moreData(state.cityDetails.data)
        await state.cityDetails.loadImages(state.cityDetails.cityUrban)
        await state.cityDetails.loadScores(state.cityDetails.cityUrban)
        await state.cityDetails.getGeneralInfo(state.cityDetails.cityUrban)

        // LOAD DATA TO UI
        resultView.removeLoader()
        resultView.fillData(
          state.cityDetails.data,
          state.cityDetails.cityUrban,
          state.cityDetails.imageLinks,
          state.cityDetails.cityScores,
          state.cityDetails.cityGenInfo,
        )
      } else {
        resultView.removeLoader()
        resultView.fillData(state.cityDetails.data)
      }
    } catch (err) {
      console.log(err)
    }
    //
  }
  window.addEventListener('load', displayDetails)
}
