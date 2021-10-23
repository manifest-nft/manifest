import React from 'react';
import { ConnectButton } from 'components/ui';
import { Box } from "@chakra-ui/react"

export const Header = () => {
  return (
    <Box w="100%" py={4} backgroundColor="blue.100" d="flex" px={10}>
      <Box flex="1"></Box>
      <ConnectButton />
    </Box>
  )
}