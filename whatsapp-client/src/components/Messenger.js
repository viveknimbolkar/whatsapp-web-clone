import React, { useContext, useEffect, useState } from 'react'
import LoginDialog from './account/LoginDialog'
import { AppBar, Box, Toolbar } from '@mui/material'
import styled from '@emotion/styled'
import { AccountContext } from '../context/AccountProvider';
import ChatDialog from './chat/ChatDialog';
import jwtDecode from 'jwt-decode';

const Header = styled(AppBar)`
    height:220px;
    background-color:#00bfa5;
    box-shadow:none;
`;
const Section = styled(Box)`
    height:100vh;
    background-color:#dcdcdc;
`
function Messenger() {
  const { account } = useContext(AccountContext)
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const getUserToken = localStorage.getItem("whatsapp-clone-token");
    
  //   if (getUserToken) {
  //     console.log("getUserToken", getUserToken.credential);
  //     const token = jwtDecode(getUserToken.credential)
  //     console.log("token", token);
  //     setIsLoggedIn(true)
  //   } else {
  //     setIsLoggedIn(false)
  //   }
  // }, [account])

  return (
    <>
      <Section>
        {account
          ? <ChatDialog />
          : <>
            <Header>
              <Toolbar>
              </Toolbar>
            </Header>
            <LoginDialog />
          </>
        }

      </Section>
    </>
  )
}

export default Messenger