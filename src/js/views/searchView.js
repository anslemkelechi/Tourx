import { UI } from '../base'

// CLEAR INPUT FEILD WHEN PAGE RELOADS
if (UI.inputField) {
  window.addEventListener('load', () => {
    UI.inputField.value = ''
  })
}

export const getInput = () => UI.inputField.value

export const displaySuggestions = (resultsArr) => {
  resultsArr.forEach((cur) => {
    const markup = `
                  <span class="more_detail" id=${cur._links['city:item'].href}>${cur.matching_full_name}</span>
         `
    UI.dataList.insertAdjacentHTML('beforeend', markup)
  })

  // Redirect to details page
  const moreDetails = Array.from(document.querySelectorAll('.more_detail'))
  moreDetails.forEach((cur) => {
    cur.addEventListener('click', (e) => {
      // SAVE ID(HREF) INTO SESSION
      const id = cur.id
      sessionStorage.setItem('ID', id)
      location.assign(`${location.origin}/result.html`)
    })
  })
}
export const prepareDom = () => {
  UI.dataList.style.display = 'block'
}
export const clearDom = () => {
  UI.dataList.style.display = 'none'
}
export const clearDomRes = () => {
  UI.dataList.innerHTML = ''
}
export const loader = () => {}
