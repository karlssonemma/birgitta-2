import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { CountrySelector } from '../CountrySelector.client';


export default function CountryModal() {

    let [isOpen, setIsOpen] = useState(true)

    return(
        <Dialog 
            open={isOpen} 
            onClose={() => setIsOpen(false)}
            className='h-max relative z-50'
        >
            
            <div className='fixed inset-0 backdrop-blur-sm' aria-hidden='true' />
            
            <div className='fixed flex justify-center items-center inset-0'>
                <Dialog.Panel className='bg-white p-14 max-w-lg mx-8'>
                    <Dialog.Title className='text-gray-dark text-xl'>Hi there!</Dialog.Title>
                    <Dialog.Description className='text-gray-dark py-4'>
                        Where are you shopping from? Please choose country from the list below
                    </Dialog.Description>
                    <CountrySelector />
                </Dialog.Panel>
            </div>
            
        </Dialog>
    )
};