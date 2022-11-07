import Layout from '../common/Layout';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Edit() {
  const params = useParams();
  const [Detail, setDetail] = useState({});
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');

  useEffect(() => {
    const item = { num: params.num };

    axios.post('/api/community/detail', item)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.detail);
          setDetail(res.data.detail);
        }
      })
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    setTitle(Detail.title);
    setContent(Detail.content);
  }, [Detail])

  return (
    <Layout name={'Edit'}>
      <label htmlFor="title">Title</label>
      <input type="text" value={Title || ''} id='title' onChange={e => setTitle(e.target.value)} />

      <label htmlFor="content">Content</label>
      <textarea name="content" id="contend" cols="30" rows="4" value={Content || ''} onChange={e => setContent(e.target.value)}></textarea>
    </Layout>
  );
}

export default Edit;