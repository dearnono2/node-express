import Layout from "../common/Layout";
import axios from 'axios';
import { useEffect, useState } from 'react';

function List() {
  const [List, setList] = useState([]);

  useEffect(() => {
    axios.post('/api/read')
      .then(res => {
        if(res.data.success) {
          console.log(res.data.communityList);
          setList(res.data.communityList);
        }
      })
      .catch(err => console.log(err));
  }, [])
  return (
    <Layout name={'List'}>
      {List.map(post => {
        return(
          <article key={post._id}>
            <h2>{post.title}</h2>
          </article>
        )
      })}
    </Layout>
  )
}

export default List