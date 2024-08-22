import React from 'react'
import Sidebar from './SideBar'

type Props = {}

const NavBar = (props: Props) => {
  return (
    <div className='p-4 shadow-lg flex justify-between items-center'>
        <Sidebar />
        <h1 className='text-2xl font-bold'>BrainDeck</h1>
    </div>
  )
}

export default NavBar