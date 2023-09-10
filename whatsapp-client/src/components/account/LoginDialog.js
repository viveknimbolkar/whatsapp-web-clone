import { Box, Dialog, ListItem, List, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { qrCodeImage } from '../constant/data'
import styled from '@emotion/styled'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { AccountContext } from '../../context/AccountProvider'
import { addUser } from '../../service/api'
function LoginDialog() {
    const { setAccount } = useContext(AccountContext)
    const dialogStyle = {
        height: '96%',
        width: '60%',
        marginTop: "12%",
        maxWidth: "100%",
        maxHeight: "100%",
        boxShadow: 'none',
        overflow: 'hidden'
    }
    const Container = styled(Box)`
    display:flex;
`
    const Steps = styled(Box)`
    padding: 56px 20px;
`
    const QrCode = styled('img')({
        height: '264px',
        margin: "50px 0 0 50px",
    })
    const Title = styled(Typography)`
    font-size:26px;
    color:#525252;
    font-weight:300;
    font-family:inherit;
    margin-bottom: 25px;
`;
    const StyleList = styled(List)`
    & > li{
        padding:0;
        margin-top:15px;
        font-size:18px;
        line-height:28px;
        color:#4a4a4a;
    }
`
    const LoginContainer = styled(Box)`
    position:relative;
`
    const GoogleLoginContainer = styled(Box)`
    position:absolute;
    top:50%;
    left:27%;
`
    const handleGoogleOauthError = (res) => {
        console.log(res);

    }

    const handleGoogleOAuthSuccess = async (res) => {
        const credentials = jwt_decode(res.credential);
        const user = await addUser(credentials)
        if (user) {
            localStorage.setItem('whatsapp-token', JSON.stringify({ email:user.email, sub:user.sub }))
            setAccount(user)
        }
    }

    return (
        <>
            <Dialog open={true} PaperProps={{ sx: dialogStyle }}>
                <Container>
                    <Steps>
                        <Title>
                            To use whatsapp on your computer
                        </Title>
                        <StyleList>
                            <ListItem>1. Open Whatsapp on your phone</ListItem>
                            <ListItem>2. Tap Menu or Settings and select Linked Device</ListItem>
                            <ListItem>3. Point you phone to screen to capture the code</ListItem>
                        </StyleList>
                    </Steps>
                    <LoginContainer>
                        <QrCode src={qrCodeImage} alt='qr code' />
                        <GoogleLoginContainer>
                            <GoogleLogin onSuccess={handleGoogleOAuthSuccess} onError={handleGoogleOauthError} />
                        </GoogleLoginContainer>
                    </LoginContainer>
                </Container>
            </Dialog>
        </>
    )
}

export default LoginDialog