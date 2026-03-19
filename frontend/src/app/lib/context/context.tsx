"use client"

import { createContext, useContext, useEffect, useState } from "react"
import axiosInstance from "../../API/axiosInstance"
//import { getIsLoggedOut } from "../flag";

type User = {
  username: string
  email?: string
}

type UserContextType = {
  user: User | null
  loading: boolean
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/farm/farm-profile")
        setUser(res.data)
      } catch (err) {
        console.error("Failed to load user", err)
      } finally {
        setLoading(false)
      }
    }
    if (!document.cookie.includes("access_token")) return;
    fetchUser()

  }, [])

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)