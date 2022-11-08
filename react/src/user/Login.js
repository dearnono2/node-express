import Layout from '../common/Layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../firebase';
import styled from 'styled-components';

const BtnSet = styled.div`
  margin-top: 20px;
`

function Login() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState('');
  const [Pwd, setPwd] = useState('');
  const [Err, setErr] = useState('');

  return (
    <Layout name={'Login'}>
      <input type="email" value={Email} placeholder='이메일 주소를 입력하세요.' onChange={e => setEmail(e.target.value)} />
      <input type="password" value={Pwd} placeholder='비밀번호를 입력하세요' onChange={e => setPwd(e.target.value)} />
      
      <BtnSet>
        <button>로그인</button>
      </BtnSet>
    </Layout>
  );
}

export default Login;