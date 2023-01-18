// import {useProduct} from '@shopify/hydrogen/client';
import { useProductOptions, AddToCartButton } from '@shopify/hydrogen/client';
import { BUTTON_DEFAULT_CLASS } from './Button.client';
import { useState } from 'react';

export default function ProductOptions() {
  const {options, setSelectedOption, selectedOptions, selectedVariant} = useProductOptions();

  const [btnLabel, setBtnLabel] = useState('Add to cart')

  const handleClick = (e) => {
    setBtnLabel('Added!')
    setTimeout(() => {
      setBtnLabel('Add to cart')
    }, 1000)
  }

  return(
    <div className="mb-6">
      <p className="font-light sr-only">{options[0].name}</p>
      {options.map(({name, values}) => {
        return(
        <form key={name}>
          <p className="max-w-fit uppercase mb-3 pb-1 text-xs text-black border-b border-black tracking-wider">{name}</p>
          {values.map((value) => {
            const checked = selectedOptions[name] === value;
             const id = `option-${name}-${value}`
            return(
              
              <label 
                htmlFor={id} 
                key={id}
                className="flex text-black pb-2 cursor-pointer tracking-wide font-light"
              >
                <input
                  type="radio" 
                  value={value} 
                  id={id} 
                  checked={checked}
                  onChange={() => setSelectedOption(name, value)}
                  className="absolute opacity-0 peer"
                />
                <div className="mr-3 peer-focus-visible:outline peer-focus:outline-2 peer-focus:outline-[#005fcc] rounded-sm">
                {checked ? <CheckedIcon /> : <NotCheckedIcon />}
                </div>
              {value}
              </label>
              
            )
          })}
          <AddToCartButton
            // id={selectedVariant.id}
            variantId={selectedVariant.id}
            quantity={1}
            accessibleAddingToCartLabel="Adding item to your cart"
            className={`${BUTTON_DEFAULT_CLASS} mt-6`}
            onClick={(e) => handleClick(e)}
          >
              {btnLabel}
          </AddToCartButton>
        </form>
      )})}
    </div>
  )

}

function CheckedIcon() {
  return(
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="13" cy="13" r="12.25" stroke="black" strokeWidth="1"/>
    <line x1="7.15631" y1="13.2258" x2="11.1563" y2="17.2258" stroke="black" strokeWidth="1"/>
    <line x1="20.0342" y1="9.40839" x2="11.1562" y2="18.2864" stroke="black" strokeWidth="1"/>
    </svg>

  )
}

function NotCheckedIcon() {
  return(
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="13" cy="13" r="12.25" stroke="black" strokeWidth="1"/>
    </svg>
  )
}
