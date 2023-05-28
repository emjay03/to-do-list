import React, { useEffect } from 'react';
import { useLocation , useNavigate } from "react-router-dom";
import { Avatar, WrapItem } from '@chakra-ui/react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
 
  MenuGroup,
  Button,
 
  MenuDivider,
} from '@chakra-ui/react'
import { PhoneIcon, AddIcon, WarningIcon,HamburgerIcon,ChevronRightIcon } from '@chakra-ui/icons'

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Radio,
  useDisclosure,
  RadioGroup,
  Stack,
} from '@chakra-ui/react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@chakra-ui/react'
function Home() {
  const location = useLocation();
  const sessionName = location.state?.sessionName || ""; // Retrieve sessionName from location state
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const [placement, setPlacement] = React.useState('left')
  useEffect(() => {
    // Check if sessionName is not present or empty, then navigate to the login page
    if (!sessionName) {
      navigate('/'); // Navigate to the login page
    }
  }, [sessionName, navigate]);

  return (
    <div className='home-container'>
       
        <div className='home-header'>
        <h1>TO DO</h1>

 
         
      <Button colorScheme='blue' onClick={onOpen}>
      <HamburgerIcon />
      </Button>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
          <DrawerBody>
          <WrapItem className="WrapItem">
    <Avatar name='Dan Abrahmov' className="avatar-img"src='https://bit.ly/dan-abramov' />
    
    <h1>Welcome,<br></br> {sessionName}!</h1>
    
  </WrapItem>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
       
        
 
      </div>
      <div className='home-body'>
      <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
  <BreadcrumbItem>
    <BreadcrumbLink href='#'>Home</BreadcrumbLink>
  </BreadcrumbItem>

  
  
</Breadcrumb>

<div className='board'>
<div className='board-t'>s</div>
<div className='board-t'>s</div>
<div className='board-t'>s</div>
</div>
     </div>
    </div>
  )
}

export default Home