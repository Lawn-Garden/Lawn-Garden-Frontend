import { loginWithGithub } from '@/api/auth';
import { GITHUB_OAUTH_STATE_KEY } from '@/configs/authConfig';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const parseGithubCallback = () => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const saved = localStorage.getItem(GITHUB_OAUTH_STATE_KEY);

    if (!code) throw new Error('Missing code');
    if (!state || !saved || state !== saved)
      throw new Error('Invalid OAuth state');

    localStorage.removeItem(GITHUB_OAUTH_STATE_KEY);
    return code;
  };

  const handleCallback = async () => {
    try {
      const code = parseGithubCallback();
      const res = await loginWithGithub({ code });
      // todo : res 에서 access_token, refresh 토큰을 받은 후 localStorage에 저장하는 기능 구현
      
      //   navigate('/main');
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('로그인 실패:', err.message);
      } else {
        console.error('로그인 실패: 알 수 없는 오류', err);
      }
      alert('로그인 실패!');
    }
  };

  useEffect(() => {
    handleCallback();
  }, [navigate]);
  return (
    <div>
      {/* todo : 로딩 스피너 구현 */}
      로그인 처리 중
    </div>
  );
};

export default Callback;
