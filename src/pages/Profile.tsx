import React, { useEffect, useRef } from 'react'

import { SupabaseClient } from '@supabase/supabase-js'
import { Button, Input } from '@chakra-ui/react'

interface ProfileProps {
    supabase: SupabaseClient
}

export default function Profile({ supabase }: ProfileProps) {
    const [user, setUser] = React.useState<any>(null)
    const [message, setMessage] = React.useState('')
    const [file, setFile] = React.useState<File | null>(null)

    useEffect(() => {
        getUser()
    }, [])

    const getType = (event: any) => {
        setFile(event.target.files[0])
        if (file?.type !== 'image/png' && file?.type !== 'image/jpeg') {
            event.target.value = null
            setMessage('Please upload a png or jpeg file')
        } else {
            setMessage('')
        }
    }

    const UploadImage = async () => {
        const { data, error } = await supabase.storage
            .from('images')
            .upload('pfp/profile1.png', file, {
                cacheControl: '3600',
                upsert: false,
            })
        if (error) console.log('error: ' + error)
        console.log(data)
    }

    const getUser = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser()

        setUser(user)
    }

    return (
        <>
            Hello {user?.email}
            <br />
            <br />
            <br />
            <Input onChange={(e) => getType(e)} type={'file'} />
            <p id={'error'}>{message}</p>
            <Button onClick={() => UploadImage()}>Update Photo</Button>
        </>
    )
}
