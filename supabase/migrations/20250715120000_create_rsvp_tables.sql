-- Create RSVP tables for wedding website
-- This migration creates the main RSVP table and companions table

-- RSVP main table
CREATE TABLE public.rsvps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    furigana TEXT NOT NULL,
    allergies TEXT DEFAULT '',
    attendance TEXT NOT NULL CHECK (attendance IN ('参加', '不参加')),
    message TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Companions table for additional guests
CREATE TABLE public.companions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    rsvp_id UUID NOT NULL REFERENCES public.rsvps(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    furigana TEXT NOT NULL,
    allergies TEXT DEFAULT '',
    meal_option TEXT NOT NULL CHECK (
        meal_option IN ('一般', 'お子様用(3歳以上くらいから)', 'ビュッフェのみ', '不要')
    ),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_rsvps_attendance ON public.rsvps(attendance);
CREATE INDEX idx_rsvps_created_at ON public.rsvps(created_at);
CREATE INDEX idx_companions_rsvp_id ON public.companions(rsvp_id);
CREATE INDEX idx_companions_meal_option ON public.companions(meal_option);

-- Add updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER trigger_rsvps_updated_at
    BEFORE UPDATE ON public.rsvps
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_companions_updated_at
    BEFORE UPDATE ON public.companions
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companions ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access for RSVP submission
-- Note: For wedding RSVP, we typically want to allow public submissions
CREATE POLICY "Allow public read access" ON public.rsvps
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON public.rsvps
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access" ON public.companions
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON public.companions
    FOR INSERT WITH CHECK (true);

-- Add comments for documentation
COMMENT ON TABLE public.rsvps IS 'Main RSVP responses for wedding guests';
COMMENT ON TABLE public.companions IS 'Additional guests/companions for each RSVP';

COMMENT ON COLUMN public.rsvps.name IS 'Guest full name';
COMMENT ON COLUMN public.rsvps.furigana IS 'Guest name in furigana (Japanese phonetic)';
COMMENT ON COLUMN public.rsvps.allergies IS 'Food allergies or dietary restrictions';
COMMENT ON COLUMN public.rsvps.attendance IS 'Attendance status: 参加 (attending), 不参加 (not attending), 保留 (pending)';
COMMENT ON COLUMN public.rsvps.message IS 'Congratulatory message from guest';

COMMENT ON COLUMN public.companions.rsvp_id IS 'Reference to main RSVP entry';
COMMENT ON COLUMN public.companions.name IS 'Companion full name';
COMMENT ON COLUMN public.companions.furigana IS 'Companion name in furigana';
COMMENT ON COLUMN public.companions.allergies IS 'Companion food allergies or dietary restrictions';
COMMENT ON COLUMN public.companions.meal_option IS 'Meal preference: 一般 (regular), お子様用(3歳以上くらいから) (children 3+), ビュッフェのみ (buffet only), 不要 (not needed)';