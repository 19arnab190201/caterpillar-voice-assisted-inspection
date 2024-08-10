import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav class='bg-white border-gray-200 light:bg-gray-900'>
      <div class='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <a
          href='https://flowbite.com/'
          class='flex items-center space-x-3 rtl:space-x-reverse'>
          <img
            src='https://flowbite.com/docs/images/logo.svg'
            class='h-8'
            alt='Flowbite Logo'
          />
        </a>
        <button
          data-collapse-toggle='navbar-default'
          type='button'
          class='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 light:text-gray-400 light:hover:bg-gray-700 light:focus:ring-gray-600'
          aria-controls='navbar-default'
          aria-expanded='false'>
          <span class='sr-only'>Open main menu</span>
          <svg
            class='w-5 h-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'>
            <path
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M1 1h15M1 7h15M1 13h15'
            />
          </svg>
        </button>
        <div class='hidden w-full md:block md:w-auto' id='navbar-default'>
          <ul class='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white light:bg-gray-800 md:light:bg-gray-900 light:border-gray-700'>
            <button
              type='button'
              class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
              onClick={() => {
                navigate("/addinspection");
              }}>
              Add Inspection
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
