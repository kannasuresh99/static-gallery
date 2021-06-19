import React from "react";
import { NavMenu, NavItem } from '@mui-treasury/components/menu/navigation';
import { useFloatNavigationMenuStyles } from '@mui-treasury/styles/navigationMenu/float';
import Link from 'next/link';


export default function Navbar(props) {
  return (
    <div>
    <NavMenu gutter={1} useStyles={useFloatNavigationMenuStyles}>
      <Link href='/'>
        <NavItem active>Home</NavItem>
      </Link>
      <Link href='/about'>
        <NavItem>About</NavItem>
      </Link>
    </NavMenu>
  </div>
  );
}
