import Image from "next/image"

const CustomButton = ({ title, buttonType, containerStyles, textStyles = "", rightIcon, handleClick }) => {
  return (
    <button
      disabled={false}
      type={buttonType}
      className={containerStyles}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>
        {title}
      </span>

      {rightIcon && (
        <div className='relative w-6 h-6 right-4 top-[-2px]'>
          <Image 
            src={rightIcon}
            alt="right icon"
            fill
            className="object-contain"
          />
        </div>
      )}
    </button>
  )
}

export default CustomButton
