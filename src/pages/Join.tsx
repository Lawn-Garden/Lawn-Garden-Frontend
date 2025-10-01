import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/assets/Logo.svg';
import { LogoStyle } from '@/styles/LogoStyle';
import Wrapper from '@/styles/Wrapper';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { SignText, TextButton } from '@/components/SignText';
import { signUp } from '@/api/auth';

export default function Join() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [githubId, setGithubId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async () => {
    try {
      await signUp({ email, githubId, password });
      alert('회원가입 성공!');
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error('알 수 없는 에러:', err);
      }
      alert('회원가입 실패');
    }
  };

  return (
    <Wrapper marginBottom>
      <LogoStyle src={Logo} alt="Logo" />
      <Input
        placeholder="Email"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Github ID"
        value={githubId}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setGithubId(e.target.value)}
      />
      <Input
        placeholder="PASSWORD"
        type="password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      />
      <Button onClick={handleSubmit}>SignUP</Button>
      <SignText color="#99BC85">
        이미 회원이신가요?
        <TextButton onClick={() => navigate('/')}> 로그인</TextButton>
      </SignText>
    </Wrapper>
  );
}
