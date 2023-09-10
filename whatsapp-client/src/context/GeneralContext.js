import { createContext, useContext, useState } from "react";

export const GeneralContext = createContext()

function GeneralProvider({ children }) {
    const [toggleContactInfo, setToggleContactInfo] = useState(false);
    const [toggleChat, setToggleChat] = useState(false);
    const [isTyping, setIsTyping] = useState(false)
    const [chatWallpaper, setChatWallpaper] = useState(undefined)

    return <GeneralContext.Provider value={{
        toggleContactInfo,
        setToggleContactInfo,
        toggleChat,
        setToggleChat,
        isTyping,
        setIsTyping,
        chatWallpaper,
        setChatWallpaper,
    }}>
        {children}
    </GeneralContext.Provider>
}

export default GeneralProvider;