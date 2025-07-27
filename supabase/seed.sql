-- Seed data for testing RSVP functionality
-- This file contains sample data for development and testing

-- Insert sample RSVP entries
INSERT INTO public.rsvps (id, name, furigana, allergies, attendance, message) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', '田中太郎', 'たなかたろう', 'エビアレルギー', '参加', 'ご結婚おめでとうございます！楽しみにしています。'),
    ('550e8400-e29b-41d4-a716-446655440002', '佐藤花子', 'さとうはなこ', '', '参加', 'お二人の幸せを心よりお祈りしています。'),
    ('550e8400-e29b-41d4-a716-446655440003', '山田次郎', 'やまだじろう', 'ナッツアレルギー', '不参加', '残念ですが都合がつきません。お幸せに！'),
    ('550e8400-e29b-41d4-a716-446655440004', '鈴木美咲', 'すずきみさき', '', '保留', '予定を確認してからご連絡いたします。');

-- Insert sample companions
INSERT INTO public.companions (rsvp_id, name, furigana, allergies, meal_option) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', '田中恵美', 'たなかえみ', '乳製品アレルギー', '一般'),
    ('550e8400-e29b-41d4-a716-446655440001', '田中和也', 'たなかかずや', '', 'お子様用(3歳以上くらいから)'),
    ('550e8400-e29b-41d4-a716-446655440002', '佐藤健太', 'さとうけんた', '', '一般'),
    ('550e8400-e29b-41d4-a716-446655440004', '鈴木拓哉', 'すずきたくや', '', 'ビュッフェのみ');

-- Insert a test entry with no companions
INSERT INTO public.rsvps (id, name, furigana, allergies, attendance, message) VALUES
    ('550e8400-e29b-41d4-a716-446655440005', '高橋一人', 'たかはしかずと', '', '参加', '一人での参加になりますが、よろしくお願いします。');