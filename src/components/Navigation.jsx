import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  const [menu, setMenu] = useState(false); // For mobile menu

  return (
    <>
      {/* NAVIGATION */}
      <div className='m-0 p-0 bg-black'>
        {/* Mobile navigation */}
        <div className='flex w-full p-2 justify-between items-center md:hidden '>
          <div>
            <Link to='/home'>
              <img src="src/assets/Logo AI.png" alt="Logo" className='h-6' />
            </Link>
          </div>
          <div>
            <img 
              src="src/assets/menu icon.png" 
              alt="Menu Icon" 
              className='h-5' 
              onClick={() => setMenu(!menu)} 
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {menu && (
          <div className='w-full flex justify-evenly p-2 text-sm md:hidden flex-wrap gap-2'>
           <ul className='flex gap-2 mt-2 flex-wrap '>
            <Link to='/' className='font-semibold border-b-2 border-blue-600'><li>Home</li></Link>
            <Link to='/imagerecognition'><li className='border-b-2 border-blue-600'>Image Recognition</li></Link>
            <Link to='/objrec'><li className='border-b-2 border-blue-600'>Object Recognition</li></Link>
            <Link to='/gpt'><li className='border-b-2 border-blue-600'>QnA Model</li></Link>
            <Link to='/services'><li className='border-b-2 border-blue-600'>About Us</li></Link>

           </ul>
          </div>
        )}

        {/* Desktop navigation */}
        <div className='hidden md:flex p-2 items-center justify-between min-h-16 w-[80%] m-auto bg-black text-pink-400 mt-2 rounded-2xl'>
          <div>
            <Link to='/'>
              <img src="src/assets/Logo AI.png" alt="Logo" className='h-9' />
            </Link>
          </div>
          <div className='flex gap-2 items-center w-fit'>
            <ul className='flex gap-4'>
              <Link to='/'>
                <li className='hover:border-cyan-400 border-b-2 border-transparent transition duration-150'>Home</li>
              </Link>

              {/* Dropdown Navigation */}
              <div className="relative group z-10">
                <li className="hover:border-cyan-400 border-b-2 border-transparent transition duration-150 cursor-pointer">
                  Models
                </li>
                <div className="absolute opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150 transform -translate-y-2 shadow-lg tracking-wide text-black mt-2">
                  <ul className="flex flex-col p-2 font-light bg-white">
                    <li>
                      <Link to="/imagerecognition" className="block  px-4 py-2 hover:bg-pink-100 transition border-transparent hover:border-cyan-400 border-b-2">
                        Image Recognition
                      </Link>
                    </li>
                    <li>
                      <Link to="/objrec" className="block px-4 py-2 hover:bg-pink-100 transition border-transparent hover:border-cyan-400 border-b-2">
                        Object Recognition
                      </Link>
                    </li>
                    <li>
                      <Link to="/gpt" className="block px-4 py-2 hover:bg-pink-100 transition border-transparent hover:border-cyan-400 border-b-2">
                        Qna Model
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <Link to='services'>
                <li className='hover:border-cyan-400 border-b-2 border-transparent transition duration-150'>About Us</li>
              </Link>
            </ul>
            <div>
              <button className='p-2'>
                <Link target='_blank' to='https://github.com/AliAbdullah0/FBISE-Project-Updated'>
                  <img src="src/assets/github.png" alt="GitHub" className='h-7' />
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
