import React, { useEffect } from 'react'
import { SupabaseClient } from '@supabase/supabase-js'
import { Box, Flex } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import Login from '../../components/Login'
import Register from '../../components/Register'

interface AuthProps {
    supabase: SupabaseClient
}

export default function Auth({ supabase }: AuthProps) {
    const navigate = useNavigate()

    useEffect(() => {
        isLoggedIn()
    }, [])

    const isLoggedIn = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser()

        user !== null && navigate('/Services')
    }

    return (
        <Box className="w-full h-screen flex flex-row items-center justify-even">
            <Login supabase={supabase} />
            <Register supabase={supabase} />
        </Box>
    )
}
