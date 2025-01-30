import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import { useAuthContext } from '@/config/providers/AuthProvider';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const DropdownMenu = () => {
  const { user } = useAuthContext();
  const handleLogout = () => {
    alert('Logged out');
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center space-x-2 bg-gray-800 text-white py-2 px-4 rounded-full">
          <UserIcon className="h-6 w-6" />
          <span className="hidden md:block">{user?.email}</span>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? 'bg-blue-50 text-blue-700' : 'text-blue-500',
                    'block w-full text-left px-4 py-2 text-sm'
                  )}
                >
                  Profile
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={classNames(
                    active ? 'bg-red-100 text-red-900' : 'text-red-600',
                    'block w-full text-left px-4 py-2 text-sm'
                  )}
                >
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
