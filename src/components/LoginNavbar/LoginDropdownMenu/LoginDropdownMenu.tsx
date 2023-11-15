import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { defaultStyles } from '../../../constants/defaultStyles';

interface LoginDropdownMenuProps {
  onLogout: () => void;
}

const LoginDropdownMenu = ({ onLogout }: LoginDropdownMenuProps) => {
  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button className={defaultStyles.orangeButton} onClick={() => {}}>
        {({ open }) =>
          open ? (
            <div className="flex gap-2 items-center">
              Your name here <MdArrowDropUp />
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              Your name here <MdArrowDropDown />
            </div>
          )
        }
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute mt-2 w-52 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item as={'div'} className="flex justify-center">
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-orange text-white' : 'text-dark'
                  } rounded-md text-sm py-2 hover:scale-105 w-11/12`}>
                  Your profile
                </button>
              )}
            </Menu.Item>
            <Menu.Item as={'div'} className="flex justify-center">
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-orange text-white' : 'text-dark'
                  } rounded-md text-sm py-2 hover:scale-105 w-11/12`}>
                  Settings
                </button>
              )}
            </Menu.Item>
            <Menu.Item as={'div'} className="flex justify-center">
              {({ active }) => (
                <button
                  onClick={onLogout}
                  className={`${
                    active ? 'bg-orange text-white' : 'text-dark'
                  } rounded-md text-sm py-2 hover:scale-105 w-11/12`}>
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LoginDropdownMenu;
