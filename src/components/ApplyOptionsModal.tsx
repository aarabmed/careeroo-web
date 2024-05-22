import { Dialog,Listbox, Transition } from '@headlessui/react'
import React ,{Fragment, useEffect, useState}from 'react'

import ApplyOptions from "@/components/ApplyOptions"



export default function Index({isOpen, closeModal, data}:{isOpen:boolean, closeModal:any, data:any}) {



    return <Transition.Root show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-10"  onClose={closeModal}>
        <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
        <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                    enterTo="opacity-100 translate-y-0 md:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 md:scale-100"
                    leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                >
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div className='w-2/3 grow basis-1/2  bg-white scrollbar sticky overflow-y-auto overscroll-auto top-4 mt-4 py-4 cursor-pointer  transition-all duration-1000 border rounded md:flex md:flex-wrap'>
                    
                      <ApplyOptions data={data}/>
                  </div>
                </Dialog.Panel>
                </Transition.Child>
            </div>
        </div>
    </Dialog>
</Transition.Root>
}
