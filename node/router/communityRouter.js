const express = require('express');
const router = express.Router();

const { Post } = require('../model/postSchema.js');
const { Counter } = require('../model/counterSchema.js');

// create
router.post('/create', (req, res) => {
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


});

// read
router.post('/read', (req, res) => {
  Post.find()
    .exec()
    .then(doc => {
      res.json({ success: true, communityList: doc })
    })
    .catch(err => {
      console.log(err);
      res.json({ success: false })
    })
});

// detail
router.post('/detail', (req, res) => {
  Post.findOne({communityNum: req.body.num}).exec()
    .then(doc => {
      res.json({success: true, detail: doc});
    })
    .catch(err => {
      console.log(err);
      res.json({ success: false });
    })
});

//edit
router.post('/edit', (req, res) => {
  const temp = {
    title: req.body.title,
    content: req.body.content
  }

  Post.updateOne({ communityNum: req.body.num }, { $set: temp })
    .exec()
    .then(() => {
      res.json({ success: true })
    })
    .catch(err => {
      console.log(err);
      res.json({ success: false })
    })
})

module.exports = router;