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
// CONVERT NUMBER TO MATHEMATICAL FIGURES
const convertNumber = (el) => {
  const num = el.toString().split('')
  if (num.length === 4) {
    num.splice(1, 0, ',')
  } else if (num.length === 5) {
    num.splice(2, 0, ',')
  } else if (num.length === 6) {
    num.splice(3, 0, ',')
  } else if (num.length === 7) {
    num.splice(1, 0, ',')
    num.splice(5, 0, ',')
  } else if (num.length === 8) {
    num.splice(2, 0, ',')
    num.splice(6, 0, ',')
  } else if (num.length === 9) {
    num.splice(3, 0, ',')
    num.splice(7, 0, ',')
  } else if (num.length === 10) {
    num.splice(1, 0, ',')
    num.splice(5, 0, ',')
    num.splice(9, 0, ',')
  }
  return num.join('')
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

  checkValid(score) == 'Unknown'
    ? [UI.safetyScore, UI.healthScore, UI.eduScore, UI.costScore].forEach(
        (cur) => {
          cur.innerHTML = `<span><h4>Value Unknown</h4></span>`
        },
      )
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
          UI.safetyScore.style.backgroundImage = `conic-gradient(${
            cur.color
          } ${calcGradient(
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
          UI.healthScore.style.backgroundImage = `conic-gradient(${
            cur.color
          } ${calcGradient(
            convertFloat(cur.score_out_of_10),
          )}deg, #eae8e8 0deg)`
        } else if (cur.name == 'Cost of Living') {
          const markup = `
      <span>
              <h3>${convertFloat(cur.score_out_of_10)}%</h3>
                <h2>${cur.name} Score</h2>
                </span>
      `
          UI.costScore.insertAdjacentHTML('beforeend', markup)
          UI.costScore.style.backgroundImage = `conic-gradient(${
            cur.color
          } ${calcGradient(
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
          UI.eduScore.style.backgroundImage = `conic-gradient(${
            cur.color
          } ${calcGradient(
            convertFloat(cur.score_out_of_10),
          )}deg, #eae8e8 0deg)`
        }
      })
  UI.citySummary.innerHTML =
    checkValid(score) == 'Unknown'
      ? `<span><p>No Info, Data not found</p></span>`
      : score.data.summary

  checkValid(info) == 'Unknown'
    ? [
        UI.population,
        UI.tempHigh,
        UI.tempLow,
        UI.currency,
        UI.lang,
        UI.DS,
      ].forEach((cur) => {
        cur.textContent = 'Undisclosed'
      })
    : info.data.categories.forEach((cur) => {
        cur.data.forEach((el) => {
          if (el.id == 'POPULATION-SIZE') {
            UI.population.textContent = `${convertNumber(
              el.float_value * 1000000,
            )}`
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
