import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'

export function Tooltip({ children, content }) {
  return (
    <Popover className="relative">
      <Popover.Button as="div" className="outline-none">
        {children}
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 px-4 py-2 mt-2 text-sm bg-gray-900 text-white rounded-lg shadow-lg">
          {content}
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}