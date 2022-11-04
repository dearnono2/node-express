const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

const { Post } = require('./model/postSchema.js');

const { Counter } = require('./model/counterSchema.js');

app.use(express.static(path.join(__dirname, '../react/build')));

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
  // Counter 모델로부터 CommunityNum값을 찾아서 프론트에서 전달받은 데이터에 추가.
  // 이때 Counter모델에 findOne 메서드로 찾을 document의 조건 설정.
  Counter.findOne({name: 'counter'})
    .exec()
    .then(doc => {
      // 기존 프론트에서 받은 데이터에 방금 파라미터로 전달받은 document의 communityNum값을 추가 적용.
      const PostModel = new Post({
        title: req.body.title,
        content: req.body.content,
        communityNum: doc.communityNum,
      });

      // 위에서 생성된 모델 인스턴스를 DB에 저장
      PostModel.save()
        .then(() => {
          // 성공적으로 Post 모델이 저장되면 기존 카운터의 communityNum값을 1 증가해서 document 업데이트
          // update에서 자주 쓰는 수정방식 3가지
          // 1. $inc(기존값 증가), 2. dec(기존값 감소), 3. $set(새로운 값으로 변경)
          Counter.updateOne({ name: 'counter' }, { $inc: { communityNum: 1 } })
            .then(() => {
              res.json({ success: true })
            })
        })
    })
    .catch(err => console.log(err))


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

// detail
app.post('/api/detail', (req, res) => {
  Post.findOne({communityNum: req.body.num}).exec()
    .then(doc => {
      res.json({success: true, detail: doc});
    })
    .catch(err => {
      console.log(err);
      res.json({ success: false });
    })
})