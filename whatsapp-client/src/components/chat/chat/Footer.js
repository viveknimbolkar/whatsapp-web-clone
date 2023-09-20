import styled from '@emotion/styled'
import { Box, Input, InputBase } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import MicIcon from '@mui/icons-material/Mic';
import { uploadFileToServer } from '../../../service/api';
import DeleteIcon from '@mui/icons-material/Delete';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';

import SendIcon from '@mui/icons-material/Send';
const FooterWrapper = styled(Box)`
display:flex;
align-items:center;
justify-content:center;
height:55px;
color:#919191;
background-color:#EDEDED;
gap:10px;
padding: 0 10px;
`
const InputWrapper = styled(InputBase)`
    background-color:#fff;
    border-radius:10px;
    width:100%;
    height:80%;
    padding:0px 10px;
`
const RecorderWrapper = styled(Box)`
    display:flex;
    gap:20px;
`
function Footer({ setFileUrl, fileUrl, file, setFile, textMessage, setTextMessage, sendText }) {
    const [isRecordingVoice, setIsRecordingVoice] = useState(false)
    useEffect(() => {
        const handleUploadFile = async () => {
            if (file) {
                const formData = new FormData();
                formData.append('name', file.name)
                formData.append('file', file)
                const uploadFile = await uploadFileToServer(formData)
                setFileUrl(uploadFile)
            }
        }
        handleUploadFile()
    }, [file])

    const handleFile = (e) => {
        setFile(e.target.files[0])
        setTextMessage(e.target.files[0].name)
    }

    return (
        <FooterWrapper>
            {isRecordingVoice
                ?
                <RecorderWrapper>
                    <DeleteIcon style={{ cursor: 'pointer' }} onClick={(e) => setIsRecordingVoice(false)} />
                    <GraphicEqIcon style={{ cursor: 'pointer' }} />
                    <PauseCircleOutlineIcon style={{ cursor: 'pointer' }} />
                    <SendIcon style={{ cursor: 'pointer' }} />
                </RecorderWrapper>
                : <>
                    <SentimentSatisfiedAltIcon />
                    <label htmlFor='attachFile'>
                        <AddIcon />
                    </label>
                    <input type='file' id='attachFile' style={{ display: 'none' }} onChange={handleFile} />
                    {/* <AttachFileIcon /> */}
                    <InputWrapper
                        autoFocus={true}
                        placeholder='Type a message'
                        value={textMessage}
                        onChange={(e) => {
                            setTextMessage(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            sendText(e)
                        }} />
                    {
                        textMessage === "" ? <SendIcon /> : <MicIcon onClick={e => { setIsRecordingVoice(!isRecordingVoice); console.log(e); }} />
                    }
                </>}

        </FooterWrapper>
    )
}

export default Footer