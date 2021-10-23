import React,{ useState } from 'react';
// import * as Styled from "./styles";
import { useMoralis } from 'react-moralis';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { smartTrim, networkIdToName } from 'utils';
import { useWeb3 } from "context/Web3Context";
import { useEffect } from 'react';

import { Box, Button, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react'

export const ConnectButton = () => {
  const { state: { networkId, loading } } = useWeb3();
  const { authenticate, user, logout, isAuthenticated } = useMoralis();
  const [ networkName, setNetworkName ] = useState("");
  const [ openDropdown, setOpenDropdown ] = useState(false);

  const handleLogin = async () => {
    await authenticate();
  }

  const handleWc = async () => {
    await authenticate({provider: "walletconnect"});
  }

  const handleLogout = async () => {
    setOpenDropdown(false);
    await logout();
  }

  const handleClick = () => {
    if (!user) handleLogin();
    if (!loading && isAuthenticated) {
      setOpenDropdown(prevState => !prevState);
    }
  }

  useEffect(() => {
    if (networkId) {
      setNetworkName(networkIdToName[networkId]);
    }
  }, [networkId])

  return (
    <Box>
      <Menu>
        <MenuButton as={Button} py={10}>
          {loading ? "Loading" : !user ? "Connect" : (
            <>
              <Jazzicon diameter={26} seed={jsNumberForAddress(user.attributes.accounts[0])} />
              <Text fontSize={10}>
                <p>{networkName}</p>
                <p>
                  {smartTrim(user.attributes.accounts[0], 8)}
                </p>
              </Text>
            </>
          )}
        </MenuButton>
        <MenuList>
          {!user && <>
            <MenuItem onClick={handleLogin}>Metamask</MenuItem>
            <MenuItem onClick={handleWc}>WalletConnect</MenuItem>
          </>}

          {isAuthenticated && <>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </>}
        </MenuList>
      </Menu>
    </Box>
  )
}