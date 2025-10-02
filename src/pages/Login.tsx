import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/assets/Logo.svg';
import { LogoStyle } from '@/styles/LogoStyle';
import Wrapper from '@/styles/Wrapper';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { SignText, TextButton } from '@/components/SignText';
import { login } from '@/api/auth';
// 토큰 저장위한 store
import { useAuthStore } from '@/store/authStore';
import { GITHUB_CLIENT_ID, GITHUB_OAUTH_STATE_KEY } from '@/configs/authConfig';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLoginWithGuthub = () => {
    // 난수 state 생성
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    const state = Array.from(bytes, (b) =>
      b.toString(16).padStart(2, '0')
    ).join('');

    localStorage.setItem(GITHUB_OAUTH_STATE_KEY, state);

    const params = new URLSearchParams({
      client_id: GITHUB_CLIENT_ID,
      redirect_uri: `${window.location.origin}/callback`,
      state,
    });

    window.location.href = `https://github.com/login/oauth/authorize?${params.toString()}`;
  };

  const handleLogin = async () => {
    try {
      const res = await login({ username, password });
      const { accessToken } = res.data as { accessToken: string };

      useAuthStore.getState().setAccessToken(accessToken);

      alert('로그인 성공!');
      navigate('/main');
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('로그인 실패:', err.message);
      } else {
        console.error('로그인 실패: 알 수 없는 오류', err);
      }
      alert('로그인 실패!');
    }
  };

  return (
    <Wrapper marginBottom>
      <LogoStyle src={Logo} alt="Logo" />
      <Input
        placeholder="ID"
        value={username}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
      />
      <Input
        placeholder="PASSWORD"
        type="password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      <Button onClick={handleLogin}>Login</Button>
      {/* todo : github 로그인 버튼 UI 수정 */}
      <Button onClick={handleLoginWithGuthub}>Guthub 로그인</Button>
      <SignText color="#99BC85">
        회원이 아니신가요?
        <TextButton onClick={() => navigate('/join')}> 회원가입</TextButton>
      </SignText>
    </Wrapper>
  );
}
