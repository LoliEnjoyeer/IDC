import React, { LegacyRef, useRef, useState } from 'react'
import {
    Box,
    Heading,
    FormControl,
    Input,
    FormLabel,
    Button,
    useToast,
    Flex,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { SupabaseClient } from '@supabase/supabase-js'
import { BiMailSend } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

interface LoginProps {
    supabase: SupabaseClient
}

interface LoginForm {
    email: string
    password: string
}

export default function Login({ supabase }: LoginProps) {
    const toast = useToast()
    const navigate = useNavigate()

    const schema = yup.object().shape({
        email: yup
            .string()
            .required('Email is required')
            .email('Email is incorrect'),
        password: yup
            .string()
            .required('Password is required')
            .min(8, 'Password has to be at least 8 characters long')
            .max(32, 'Password cannot be longer than 8 characters'),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(schema) })

    const [captchaToken, setCaptchaToken] = useState<string>('')
    const captcha: LegacyRef<HCaptcha> = useRef(null)

    const [isLoading, setIsLoading] = useState(false)

    const onSubmitHandler = async (data: LoginForm) => {
        setIsLoading(true)

        const { error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        })

        captcha.current?.resetCaptcha()

        if (error) {
            toast({
                title: 'Error occured!',
                description: 'Username or Password is incorrect.',
                status: 'error',
                variant: 'left-accent',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left',
            })
            setIsLoading(false)
            return
        }
        toast({
            title: 'Log-in Successful!',
            description: "You've been logged in successfully.",
            status: 'success',
            variant: 'left-accent',
            duration: 5000,
            isClosable: true,
            position: 'bottom-left',
        })

        setIsLoading(false)
        navigate('/Services')
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="w-full max-w-md mx-auto p-6 rounded-md bg-white shadow-md"
        >
            <Heading as="h1" size="lg" fontWeight="bold" mb={4}>
                Login
            </Heading>
            <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input {...register('email')} />
                <p className="text-red-600">
                    <>{errors.email?.message}</>
                </p>
            </FormControl>
            <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input {...register('password')} type="password" />
                <p className="text-red-600">
                    <>{errors.password?.message}</>
                </p>
            </FormControl>
            <FormControl>
                <HCaptcha
                    ref={captcha}
                    sitekey="ffdcb170-40f4-4cfd-a6bf-198e1e010c04"
                    onVerify={(token) => setCaptchaToken(token)}
                />
            </FormControl>
            <Box>
                <Flex align="center" justify="space-between">
                    <Button
                        isLoading={isLoading}
                        loadingText="Please Wait..."
                        type="submit"
                        mt={4}
                        colorScheme="teal"
                        leftIcon={<BiMailSend />}
                    >
                        Login
                    </Button>
                </Flex>
            </Box>
        </form>
    )
}
