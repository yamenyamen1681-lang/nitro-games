import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rucsazbldtiazjdofrem.supabase.co'
const supabaseKey = 'sb_publishable_91VipjPX7Zf1cYGSnRSVDw_2xorDqbX'

export const supabase = createClient(supabaseUrl, supabaseKey)
