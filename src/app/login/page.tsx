'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = '/';
      } else {
        setError(data.error || '認証に失敗しました');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('ネットワークエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-cream to-soft-peach flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* ロゴエリア */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-elegant font-extrabold text-foreground-heading mb-2">
            WEDDING SITE
          </h1>
        </div>

        {/* ログインフォーム */}
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-elegant font-bold text-foreground-heading mb-2">
              パスワードを入力してください
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-warm-brown font-semibold mb-2">
                パスワード
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-warm-cream-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-coral focus:border-transparent"
                placeholder="パスワードを入力"
                required
                autoFocus
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-warm-coral hover:bg-warm-coral-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '認証中...' : 'サイトに入る'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-warm-brown text-xs opacity-75">
              パスワードがわからない場合はお問い合わせください
            </p>
          </div>
        </div>

        {/* コピーライト */}
        <div className="text-center mt-8">
          <p className="text-warm-brown text-xs opacity-60">
            © 2025 {process.env.NEXT_PUBLIC_COUPLE_NAME_1} & {process.env.NEXT_PUBLIC_COUPLE_NAME_2}. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
