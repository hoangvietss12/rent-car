export async function fetchCars(filterProps) {
  const { manufacturer, year, model, limit, fuel } = filterProps;

    const headers = {
		'X-RapidAPI-Key': '118c809079msh914f3ae49ce7703p1180dejsnb6529528b8c9',
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }

    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`, {
        headers: headers
    })

    const result = await response.json()

    return result
}

export const calculateCarRent = (city_mpg, year) => {
  const basePricePerDay = 50; 
  const mileageFactor = 0.1; 
  const ageFactor = 0.05; 

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car, angle) => {
  const url = new URL('https://cdn.imagin.studio/getImage')

  const  { make, year, model } = car

  url.searchParams.append('customer', 'hrjavascript-mastery');
  url.searchParams.append('make', make)
  url.searchParams.append('angle', `${angle}`)
  url.searchParams.append('modelYear', `${year}`)
  url.searchParams.append('zoomType', 'fullscreen')
  url.searchParams.append('modelFamily', model.split(' '))
}

export const updateSearchParams = (type, value) => {
  const searchParams = new URLSearchParams(window.location.search)

  searchParams.set(type, value)

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`

  return newPathname
}