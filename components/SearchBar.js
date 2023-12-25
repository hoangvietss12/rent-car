'use client'

import { useState, Fragment } from "react"
import { manufacturers } from "@/constants"
import { Combobox, Transition } from "@headlessui/react"
import Image from "next/image"

const SearchButton = ({ otherClasses }) => {
    return (
        <button
            type="submit"
            className={`-ml-3 z-10 ${otherClasses}`}
        >
            <Image 
                src="/magnifying-glass.svg"
                alt="magnifying-glass"
                width={40}
                height={40}
                className="object-contain"
            />
        </button>
    )
}

const SearchBar = ({setManufacturer, setModel}) => {
    const [searchManufacturer, setSearchManufacturer] = useState('')
    const [searchModel, setSearchModel] = useState('')
    const [query, setQuery] = useState('')

    const filterManufacturer = query === "" 
        ? manufacturers
        : manufacturers.filter((item) => (
            item.toLocaleLowerCase().replace(/\s+/g, "").includes(query.toLocaleLowerCase().replace(/\s+/g, ""))
        ))

    const handleSearch = (e) => {
        e.preventDefault()

        if(searchManufacturer === '' && searchModel === '') return

        setModel(searchModel)
        setManufacturer(searchManufacturer)
    }

  return (
    <form className='searchbar' onSubmit={handleSearch}>
        <div className='searchbar__item'>

            {/* Search manufacturer */}
            <div className="search-manufacturer">
                <Combobox value={searchManufacturer} onChange={setSearchManufacturer}>
                    <div className="relative w-full">
                        <Combobox.Button className="absolute top-[14px]">
                            <Image 
                                src="/car-logo.svg"
                                width={20}
                                height={20}
                                className="ml-4"
                                alt="car logo"
                            />
                        </Combobox.Button>

                        <Combobox.Input 
                            className="search-manufacturer__input"
                            placeholder="BWM..."
                            displayValue={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />

                        <Transition 
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery('')}
                        >
                            <Combobox.Options>
                                {filterManufacturer.map((item) => (
                                    <Combobox.Option
                                        key={item}
                                        className={({ active }) => 
                                            `relative search-manufacturer__option ${
                                            active ? 'bg-primary-blue text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={item}
                                    >
                                        {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`block truncate ${
                                                    selected ? 'font-medium' : 'font-normal'
                                                }`}
                                            >
                                                {item}
                                            </span>
                                            {selected ? (
                                            <span
                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                active ? 'text-white' : 'text-teal-600'
                                                }`}
                                            >
                                            </span>
                                            ) : null}
                                        </>
                                        )}
                                    </Combobox.Option>
                                ))}
                            </Combobox.Options>

                        </Transition>
                    </div>
                </Combobox>
            </div>

            <SearchButton otherClasses="sm:hidden" />
        </div>

        <div className='searchbar__item'>
            <Image
            src='/model-icon.png'
            width={25}
            height={25}
            className='absolute w-[20px] h-[20px] ml-4'
            alt='car model'
            />
            <input
            type='text'
            name='model'
            value={searchModel}
            onChange={(e) => setSearchModel(e.target.value)}
            placeholder='...'
            className='searchbar__input'
            />
            <SearchButton otherClasses='sm:hidden' />
        </div>
        <SearchButton otherClasses='max-sm:hidden' />
    </form>
  )
}

export default SearchBar
