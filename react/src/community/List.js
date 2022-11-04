import Layout from "../common/Layout";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
            <h2>
              {/* 글 목록의 링크 URL, 글 고유번호를 params로 전달 */}
              <Link to={`/detail/${post.communityNum}`}>{post.title}</Link>
            </h2>
          </article>
        )
      })}
    </Layout>
  )
}

export default List;