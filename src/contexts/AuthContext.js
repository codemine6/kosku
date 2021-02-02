import {useState, useEffect, useContext, createContext} from 'react'
import {useAuth, useDb} from 'services/Api'

const AuthContext = createContext()

export function useAuthContext() {
    return useContext(AuthContext)
}

export function AuthContextProvider(props) {
    const [auth, setAuth] = useState()
    console.log('Context', auth)

    useEffect(() => {
        useAuth.onAuthStateChanged(user => {
            if (user) {
                useDb.collection('users').where('email', '==', user.email).get().then(res => {
                    setAuth(res.docs[0]?.data())
                })
            } else {
                setAuth(null)
            }
        })
    }, [])

    return (
        <AuthContext.Provider value={{auth, dispatch: setAuth}}>
            {props.children}
        </AuthContext.Provider>
    )
}