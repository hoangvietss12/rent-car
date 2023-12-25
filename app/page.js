'use client'

import Image from 'next/image'
import { Hero, SearchBar, CustomFilter, CardCar } from '@/components'
import { fetchCars } from '@/utils'
import ShowMore from '@/components/ShowMore';
import { useEffect, useState } from 'react';
import { fuels, yearsOfProduction } from '@/constants';

export default function Home() {
  const [allCars, setAllCars] = useState([])
  const [loading, setLoading] = useState(false)

  // search state
  const [manufacturer, setManufacturer] = useState('')
  const [model, setModel] = useState('')

  // filter state
  const [fuel, setFuel] = useState('')
  const [year, setYear] = useState(2023)

  // pagination state
  const [limit, setLimit] = useState(10)

  const getCars = async () => {
    setLoading(true)

    try {
      const result = await fetchCars({
        manufacturer: manufacturer || '',
        year: year || 2022,
        fuel: fuel || '',
        model: model || '',
        limit: limit || 10
      })
  
      setAllCars(result)
    }catch(error) {

    }finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    getCars()
  }, [fuel, year, manufacturer, model, limit])

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>
            Car Catalogue
          </h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
        </div>
        
        <div className='home__filter-container'>
          <CustomFilter title="fuel" options={fuels} setFilter={setFuel}/>
          <CustomFilter title="year" options={yearsOfProduction} setFilter={setYear}/>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className='home__cars-wrapper'> 
              {allCars?.map((car) => (
                <CardCar key={car} car={car} />
              ))}
            </div>

            {loading && (
              <div>
                <Image 
                  src="/loader.svg"
                  alt='Loader'
                  width={50}
                  height={50}
                  className='object-contain'
                />
              </div>
            )}

            <ShowMore 
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>
              Oops, no results
            </h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  )
}
