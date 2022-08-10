import { UI } from '../base'

export const removeLoader = () => {
  UI.preloader.style.display = 'none'
}

export const fillData = (data, moreData, imageData) => {
  // SPLIT NAME STRING TO ARRAY
  const cityNameArr = data.full_name.split(',')
  // PASS ARRAY VALUES INTO UI
  UI.stateName.textContent = `${cityNameArr[2]}/`
  UI.cityCountry.textContent = cityNameArr[1]
  UI.city.textContent = `${cityNameArr[0]}`
  UI.cityMayor.textContent = moreData['data'].mayor
  UI.externalLink.href = moreData['data'].teleport_city_url
  UI.pageImg.style.backgroundImage = `linear-gradient(to bottom, transparent, #000000eb),
    url(${imageData['data'].photos[0].image.web})`
}
