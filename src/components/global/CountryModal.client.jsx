import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CountrySelector } from '../CountrySelector.client';
import { Image } from '@shopify/hydrogen';
import globe from '../../assets/globe.jpg'
import ArrowIcon from '../ArrowIcon';


export default function CountryModal() {

    let [isOpen, setIsOpen] = useState(true)

    return(
        <Transition show={isOpen} as={Fragment}>
            <Dialog 
                onClose={() => setIsOpen(false)}
                className='h-max relative z-50'
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className='fixed inset-0 backdrop-blur-sm' aria-hidden='true' />
                </Transition.Child>


                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <div className='fixed flex justify-center items-center inset-0'>
                        <Dialog.Panel className='bg-white flex flex-row h-2/3 w-3/4 max-w-fit'>
                            <Image 
                                src={globe} 
                                width={500} 
                                height={500} 
                                className='object-contain h-auto w-auto hidden md:block'
                            />
                            <div className='p-14 flex flex-col justify-center'>
                                <Dialog.Title className='text-black text-3xl font-serif'>
                                    Hi there.
                                </Dialog.Title>
                                <Dialog.Description className='text-black font-light tracking-wider py-4'>
                                    Where are you shopping from? Please select a country from the list below:
                                </Dialog.Description>
                                <CountrySelector />
                                <button className='text-black text-sm tracking-widest w-max py-4 hover:underline' onClick={() => setIsOpen(false)}>
                                    continue to site
                                    <ArrowIcon classes='rotate-180 ml-2' />
                                </button>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    )
};