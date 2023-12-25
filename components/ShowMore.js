'use client'

import CustomButton from "./CustomButton"

const ShowMore = ({ pageNumber, isNext, setLimit }) => {
    const handleNavigation = () => {
        const newLimit = (pageNumber + 1) * 10;
    
        setLimit(newLimit)
      };

  return (
    <div className="w-full flex-center gap-5 mt-10">
        {!isNext && (
        <CustomButton
            buttonType="button"
            title="Show More"
            containerStyles="bg-primary-blue rounded-full text-white py-3 px-10"
            handleClick={handleNavigation}
        />
        )}
    </div>
  )
}

export default ShowMore
