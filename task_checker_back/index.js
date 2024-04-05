const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("./firebase_serviceAccountKey.json")
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(express.json());

// prismaを読み込む記述
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// cors対策
const cors = require('cors')
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));


// タスクの読み取り処理
app.get("/tasks", async(req, res) => {
  try {
  const AllTasks = await prisma.task.findMany();
  res.json(AllTasks)
  } catch(error) {
  console.log(error)
  }
})

// ジャンルの読み取り処理
app.get("/genres", async(req, res) => {
  try {
  const AllGenres = await prisma.genre.findMany();
  res.json(AllGenres)
  } catch(error) {
  console.log(error)
  }
})

// タスクの作成
app.post("/tasks", async (req, res) => {
  try {
    const deadlineDate = new Date(req.body.deadlineDate)
    const savedData = await prisma.task.create({
      data: {
        ...req.body,
        status: 0,
        deadlineDate: deadlineDate
      },
    });
    res.json(savedData)
  } catch(error) {
    res.status(500).send("タスクの保存に失敗しました")
  }
})

// タスクの更新
app.put("/tasks/:id", async(req, res) => {
  try{
    const deadlineDate = new Date(req.body.deadlineDate)
    const taskId = parseInt(req.params.id, 10);
    const updateData = await prisma.task.update({where:{id: taskId}, data: {
      ...req.body,
      deadlineDate: deadlineDate
    },
    })
    res.json(updateData)
  } catch(error) {
    res.status(500).send("タスクの更新に失敗しました。")
  }
})

// タスクの削除
app.delete("/tasks/:id", async(req, res) => {
  try {
    const taskId = parseInt(req.params.id, 10);
    const deletedTask = await prisma.task.delete({where: {id: taskId}})
    res.json(deletedTask)
  } catch(error) {
    res.status(500).send("タスクの削除に失敗しました")
  }
})

// ジャンルの作成
app.post("/genres", async (req, res) => {
  console.log(req.user)
  try {
    const savedData = await prisma.genre.create({data: req.body});
    res.json(savedData)
  } catch(error) {
    res.status(500).send("ジャンルの保存に失敗しました")
  }
})

// ジャンルの削除
app.delete("/genres/:id", async (req, res) => {
  try {
    const genreId = parseInt(req.params.id, 10);
    await prisma.genre.delete({where:{id: genreId}})
    return res.status(200).send();
  } catch(error) {
    res.status(500).send("ジャンルの削除に失敗しました。")
  }
})

// ステータスの更新
app.put("/tasks/:id/status", async(req, res) => {
  try {
    const taskId = parseInt(req.params.id, 10);
    const newStatus = parseInt(req.body.newStatus, 10);
    const response = await prisma.task.update({
      where: { id: taskId },
      data: { status: newStatus }
    });
    res.json(response)
  } catch(error) {
    console.log(error)
    res.status(500).send("ステータス変更に失敗しました。")
  }
})

// JWTトークン検証の処理
const verifyToken = async (req, res, next) => {
  // AuthorizationヘッダーからBearerトークンを抽出
  const token = req.headers.authorization.split("Bearer ")[1];
  try {
    // Firebase Admin SDKのverifyIdTokenメソッドを使用して、tokenの検証を実施。
    // tokenが正しい場合はdecodedTokenにユーザー情報が含まれ、next()次の処理に進む。
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch(error) {
    res.status(403).send('idが確認できませんでした');
  }
}

// マイページ表示用のタスク
app.get('/mytasks', verifyToken, async (req, res) => {
  const uid = req.user.uid;
  try {
    const AllTasks = await prisma.task.findMany();
    const MyTasks = AllTasks.filter(task => uid === task.uid);
    res.json(MyTasks);
  } catch(error) {
    res.status(500).send('データの取得ができませんでした');
  }
})


// サーバー起動処理
app.listen(3000, () => {
  console.log("listening on localhost 3000")
})  