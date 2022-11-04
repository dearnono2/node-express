import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '../common/Layout';

function Detail() {
  const params = useParams();
  const [Detail, setDetail] = useState(null);

  const item = {
    num: params.num
  }

  useEffect(() => {
    axios.post('/api/detail', item)
      .then(res => {
        if(res.data.success) {
          console.log(res.data.detail);
          setDetail(res.data.detail);
        }
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <Layout name={'Detail'}>
      {Detail && (
        <>
          <h2>{Detail.title}</h2>
          <p>{Detail.content}</p>
        </>
      )}
    </Layout>
  )
}

export default Detail;