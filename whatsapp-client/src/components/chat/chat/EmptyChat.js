import React from 'react'
import { emptyChatImage } from '../../constant/data'
import { Box, Typography } from '@mui/material'
import styled from '@emotion/styled'

const EmptyChatWrapper = styled(Box)`
  background-color:#fafafa;
  text-align:center;
  padding:0 200px;
  height:99%;
  border-bottom:7px solid #00bfa5;
`

const Image = styled("img")({
  width: 400,
  marginTop: 100,
}
)

function EmptyChat() {
  return (
    <>
      <EmptyChatWrapper>
        <Image src={emptyChatImage} alt='empty chat image' />
        <Typography sx={{fontSize:'40px',color:"#667781"}}>WhatsApp Web</Typography>
        <Typography sx={{fontSize:'14px',color:"#667781",marginTop:10,}}>Send and receive messages without keeping your phone online. Use WhatsApp on up to 4 linked devices and 1 phone at the same time.</Typography>
        <Typography sx={{fontSize:'14px',color:"#667781",marginTop:10,}}>End-to-end encrypted</Typography>
      </EmptyChatWrapper>
    </>
  )
}

export default EmptyChat