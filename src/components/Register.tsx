import React, { LegacyRef, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Box,
    Heading,
    FormControl,
    Input,
    FormLabel,
    Button,
    FormHelperText,
    useToast,
    Flex,
} from '@chakra-ui/react'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { SupabaseClient } from '@supabase/supabase-js'
import { BiMailSend } from 'react-icons/bi'

interface RegisterProps {
    supabase: SupabaseClient
}

interface RegisterForm {
    email: string
    password: string
    confirmPassword: string
}

export default function Register({ supabase }: RegisterProps) {
    const toast = useToast()

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
        confirmPassword: yup
            .string()
            .required('Confirm password is required')
            .oneOf([yup.ref('password'), null], "Passwords don't match"),
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

    const onSubmitHandler = async (data: RegisterForm) => {
        setIsLoading(true)
        const { error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                captchaToken,
                data: {
                    name: '',
                    surname: '',
                    phone: '',
                    username: '',
                },
            },
        })

        captcha.current?.resetCaptcha()

        if (error) {
            toast({
                title: 'Error occured!',
                description: 'Email is already registered.',
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
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            variant: 'left-accent',
            duration: 5000,
            isClosable: true,
            position: 'bottom-left',
        })
        setIsLoading(false)
        reset()
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="w-full max-w-md mx-auto p-6 rounded-md bg-white shadow-md"
        >
            <Heading as="h1" size="lg" fontWeight="bold" mb={4}>
                Register
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
            <FormControl id="confirmPassword">
                <FormLabel>Confirm Password</FormLabel>
                <Input {...register('confirmPassword')} type="password" />
                <p className="text-red-600">
                    <>{errors.confirmPassword?.message}</>
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
                        loadingText="Please wait..."
                        type="submit"
                        mt={4}
                        colorScheme="teal"
                        leftIcon={<BiMailSend />}
                    >
                        Register
                    </Button>
                </Flex>
            </Box>
        </form>
    )
}
