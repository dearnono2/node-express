const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

const { Post } = require('./model/postSchema.js')

//express에서 react안쪽 build폴더까지의 경로를 static으로 지정
app.use(express.static(path.join(__dirname, '../react/build')));

// 클라이언트에서 보내는 데이터를 받도록 설정 (body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(port, () => {
  mongoose
    .connect('mongodb+srv://dearnono:qwert5@cluster0.mvtd51g.mongodb.net/?retryWrites=true&w=majority')
    // 접속 성공시
    .then(() => console.log(`Server app listening on port ${port} with MongoDB`))
    // 접속 실패시
    .catch(err => console.log(err));
})

app.get('/', (req, res) => {
  //서버에서 5000포트로 접속하면 static폴더로 지정되어 있는 build안쪽의 index.html을 화면에 내보냄
  res.sendFile(path.join(__dirname, '../react/build/index.html'));
})

//어떤 URL에서 접속하더라도 화면이 뜨도록 설정
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../react/build/index.html'));
})

// create
app.post('/api/create', (req, res) => {
  console.log(req.body);
  const PostModel = new Post({
    title: req.body.title,
    content: req.body.content
  })

  PostModel.save()
    .then(() => {
      res.json({ success: true })
    })
    .catch(err => {
      res.json({ success: false })
    })
})

// read
app.post('/api/read', (req, res) => {
  Post.find()
    .exec()
    .then(doc => {
      res.json({ success: true, communityList: doc })
    })
    .catch(err => {
      console.log(err);
      res.json({ success: false })
    })
})