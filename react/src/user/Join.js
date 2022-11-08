import Layout from '../common/Layout'
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../firebase';
import axios from 'axios';

const BtnSet = styled.div`
  margin-top: 20px;
`

function Join() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState('');
  const [Pwd1, setPwd1] = useState('');
  const [Pwd2, setPwd2] = useState('');
  const [Name, setName] = useState('');

  const handleJoin = async () => {
    if (!(Name && Email && Pwd1 && Pwd2)) return alert('모든 양식을 입력하세요');
    if (Pwd1 !== Pwd2) return alert('비밀번호 2개를 동일하게 입력하세요.');
    if (Pwd1.length < 6) return alert('비밀번호는 최소 6글자 이상 입력하세요.')

    //위의 조건을 통과해서 회원가입을 하기위한 정보값을 변수에 할당
    //이때 await문으로 firebase를 통해서 인증완료 이후에 동기적으로 다음코드 처리
    let createdUser = await firebase.auth().createUserWithEmailAndPassword(Email, Pwd1);

    //반환된 user정보값에 displayName이라는 키값으로 넥네임 추가등록
    await createdUser.user.updateProfile({displayName: Name});

    // firebase로부터 인증정보값이 넘어오면 해당정보값을 다시 객체에 옮겨담음.
    const item = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid
    }

    // 서버쪽에 post 요청 보내기
    axios.post('/api/user/join', item).then(res => {
      if(res.data.success) navigate('/login');
      else return alert('회원가입에 실패했습니다.')
    })
  }

  return (
    <Layout name={'Join'}>
      <input type="email" value={Email} placeholder='이메일 주소를 입력하세요' onChange={e => setEmail(e.target.value)} />
      <input type="password" value={Pwd1} placeholder='비밀번호를 입력하세요' onChange={e => setPwd1(e.target.value)} />
      <input type="password" value={Pwd2} placeholder='비밀번호를 재입력하세요' onChange={e => setPwd2(e.target.value)} />
      <input type="text" value={Name} placeholder='사용자명을 입력하세요' onChange={e => setName(e.target.value)} />

      <BtnSet>
        <button onClick={() => navigate(-1)}>가입취소</button>
        <button onClick={handleJoin}>회원가입</button>
      </BtnSet>
    </Layout>
  );
}

export default Join;