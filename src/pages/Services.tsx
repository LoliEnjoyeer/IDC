import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { SupabaseClient } from '@supabase/supabase-js'
import { Button } from '@chakra-ui/react'

interface ServicesProps {
    supabase: SupabaseClient
}

export default function Services({ supabase }: ServicesProps) {
    const navigate = useNavigate()

    useEffect(() => {
        isLoggedIn()
    }, [])

    const isLoggedIn = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser()

        user === null && navigate('/')
    }

    const LogOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) console.log('Error: ', error)
        else navigate('/')
    }

    return (
        <>
            <h1>Services</h1>
            <br />
            <Link to={'/LiveChat'}>
                <Button colorScheme={'green'}>Live Chat</Button>
            </Link>

            <br />
            <br />
            <Link to={'/Profile'}>
                <Button colorScheme={'green'}>Profile</Button>
            </Link>

            <br />
            <br />
            <Button colorScheme={'red'} onClick={() => LogOut()}>
                Log Out
            </Button>
        </>
    )
}
