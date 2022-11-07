import Layout from "../common/Layout";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

function Edit() {
  const params = useParams();
  const [Detail, setDetail] = useState(null);
  const [Title, setTitle] = useState('');
  const [content, setContent] = useState('');
  useEffect(() => {
    const item = {num: params.num}
    axios.post('/api/community/detail', item)
      .then((res) => {
        if(res.data.success) {
          console.log(res.data.detail);
          setDetail(res.data.detail);
        }
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <Layout name={'Edit'}>

    </Layout>
  )
}

export default Edit