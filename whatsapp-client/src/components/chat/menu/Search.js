import React, { useState } from 'react'
import { Box, InputBase } from '@mui/material';
import styled from '@emotion/styled';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FilterListIcon from '@mui/icons-material/FilterList';

const SearchWrapper = styled(Box)`
  display:flex;
  align-items:center;
  justify-center:center;
  background-color:#fff;
  height:45px;
  border-bottom 1px solid #f2f2f2;
  padding:5px 10px;
  gap:10px;
`
const SearchBar = styled(Box)`
  width:100%;
  display:flex;
  align-items:center;
  justify-center:justify-between;
  border-radius:8px;
  background-color:#EDEDED;
  padding: 4px 10px;
  gap:10px;
`

function Search({ setSearchUserText }) {
  const [unreadChatActive, setUnreadChatActive] = useState(false);

  const UnreadChatWrapper = styled(Box)`
  background-color:${unreadChatActive ? "#00a884" : "none"};
  color:${unreadChatActive ? "white" : "none"};
  border-radius:50px;
  padding:5px;
  display:flex;
  align-items:center;
  justify-content:center;
`

  return (
    <SearchWrapper>
      <SearchBar>
        <ArrowBackIcon />
        <InputBase style={{ width: "100%" }} onChange={e => { setSearchUserText(e.target.value) }} placeholder='Search a new chat...' />
      </SearchBar>
      <UnreadChatWrapper onClick={() => setUnreadChatActive(!unreadChatActive)}>
        <FilterListIcon />
      </UnreadChatWrapper>
    </SearchWrapper>
  )
}

export default Search