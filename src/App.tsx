import React from 'react'

import { Routes, Route } from 'react-router-dom'
import Auth from './features/auth/Auth'
import Services from './pages/Services'

import { createClient, SupabaseClient } from '@supabase/supabase-js'
import Profile from './pages/Profile'

const supabaseUrl: string = 'https://xeknvgppxcwobsujvcxd.supabase.co'
const supabaseKey: string = import.meta.env.VITE_SUPABASE_KEY || ''
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey)

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Auth supabase={supabase} />} />
            <Route
                path="/Services"
                element={<Services supabase={supabase} />}
            />
            <Route path="/Profile" element={<Profile />} />
        </Routes>
    )
}

export default App
