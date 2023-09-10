import { createContext, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
export const AccountContext = createContext(null)

const AccountProvider = ({ children }) => {
    const [account, setAccount] = useState();
    const [person, setPerson] = useState({});
    const socket = useRef()
    const [activeUsers, setActiveUsers] = useState([]);

    useEffect(() => {
        socket.current = io('http://localhost:8000')
    }, [])

    return <>
        <AccountContext.Provider value={{
            socket,
            account,
            setAccount,
            person,
            setPerson,
            activeUsers,
            setActiveUsers
        }}>
            {children}
        </AccountContext.Provider>
    </>
}

export default AccountProvider;