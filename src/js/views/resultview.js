import { UI } from '../base'

export const removeLoader = () => {
  UI.preloader.style.display = 'none'
}

//RETURN CUSTOM VALUES WHERE DATA IS NULL/NOT FOUND/NOT LOADED
const checkValid = (data) => {
  if (data) {
    return data
  } else {
    return 'Unknown'
  }
}
export const fillData = (
  data,
  moreData = 0,
  imageData = 0,
  score = 0,
  info = 0,
) => {
  // SPLIT NAME STRING TO ARRAY
  const cityNameArr = data.full_name.split(',')
  // PASS ARRAY VALUES INTO UI
  UI.stateName.textContent = `${cityNameArr[2]}/`
  UI.cityCountry.textContent = cityNameArr[1]
  UI.city.textContent = `${cityNameArr[0]}`
  let mayorText = (UI.cityMayor.textContent = `${
    checkValid(moreData) == 'Unknown' ? 'Unknown' : moreData['data'].mayor
  }`)
  //CASES WHERE THE TEXT IS LITERALLY 'UNDEFINED'
  if (mayorText == 'undefined') {
    UI.cityMayor.textContent = 'Unknown'
  }
  UI.externalLink.href = `${
    checkValid(moreData) == 'Unknown' ? '#' : moreData['data'].teleport_city_url
  }`
  UI.pageImg.style.backgroundImage = `linear-gradient(to bottom, transparent, #000000eb),
    url(${
      checkValid(imageData) == 'Unknown'
        ? '../img/bg-3.jpg'
        : imageData['data'].photos[0].image.web
    })`

  //LOAD MOBILE IMG OM RESIZING
  window.addEventListener('resize', () => {
    let x = window.matchMedia('(max-width:768px)')
    if (x.matches) {
      UI.pageImg.style.backgroundImage = `linear-gradient(to bottom, transparent, #000000eb),
    url(${
      checkValid(imageData) == 'Unknown'
        ? '../img/bg-3.jpg'
        : imageData['data'].photos[0].image.mobile
    })`
    } else {
      UI.pageImg.style.backgroundImage = `linear-gradient(to bottom, transparent, #000000eb),
    url(${
      checkValid(imageData) == 'Unknown'
        ? '../img/bg-3.jpg'
        : imageData['data'].photos[0].image.web
    })`
    }
  })

  checkValid(score) == 'Unknown'
    ? [UI.safetyScore, UI.healthScore, UI.eduScore].forEach((cur) => {
        cur.innerHTML = `<span><h4>Value Unknown</h4></span>`
      })
    : score.data.categories.forEach((cur) => {
        const convertFloat = (data) => {
          return Math.round((data * 100) / 10)
        }
        const calcGradient = (perc) => {
          return (360 * perc) / 100
        }
        if (cur.name == 'Safety') {
          const markup = `
      <span>
              <h3>${convertFloat(cur.score_out_of_10)}%</h3>
                <h2>${cur.name} Score</h2>
                </span>
      `
          UI.safetyScore.insertAdjacentHTML('beforeend', markup)
          UI.safetyScore.style.backgroundImage = `conic-gradient(#00dbde ${calcGradient(
            convertFloat(cur.score_out_of_10),
          )}deg, #eae8e8 0deg)`
        } else if (cur.name == 'Healthcare') {
          const markup = `
      <span>
              <h3>${convertFloat(cur.score_out_of_10)}%</h3>
                <h2>${cur.name} Score</h2>
                </span>
      `
          UI.healthScore.insertAdjacentHTML('beforeend', markup)
          UI.healthScore.style.backgroundImage = `conic-gradient(#00dbde ${calcGradient(
            convertFloat(cur.score_out_of_10),
          )}deg, #eae8e8 0deg)`
        } else if (cur.name == 'Education') {
          const markup = `
      <span>
              <h3>${convertFloat(cur.score_out_of_10)}%</h3>
                <h2>${cur.name} Score</h2>
                </span>
      `
          UI.eduScore.insertAdjacentHTML('beforeend', markup)
          UI.eduScore.style.backgroundImage = `conic-gradient(#00dbde ${calcGradient(
            convertFloat(cur.score_out_of_10),
          )}deg, #eae8e8 0deg)`
        }
      })
  UI.citySummary.innerHTML =
    checkValid(score) == 'Unknown'
      ? 'No Info, Data not found'
      : score.data.summary

  info.data.categories.forEach((cur) => {
    cur.data.forEach((el) => {
      if (el.id == 'POPULATION-SIZE') {
        UI.population.textContent = `${el.float_value * 1000000}`
      } else if (el.id == 'WEATHER-AVERAGE-HIGH') {
        UI.tempHigh.innerHTML = `${el.string_value} &#x2103;`
      } else if (el.id == 'WEATHER-AVERAGE-LOW') {
        UI.tempLow.innerHTML = `${el.string_value} &#x2103;`
      } else if (el.id == 'CURRENCY-URBAN-AREA') {
        UI.currency.textContent = `${el.string_value}`
      } else if (el.id == 'SPOKEN-LANGUAGES') {
        UI.lang.textContent = `${el.string_value}`
      } else if (el.id == 'NETWORK-DOWNLOAD') {
        UI.DS.textContent = `${el.float_value}/mbs`
      }
    })
  })
}
