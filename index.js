import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import multer from "multer";
// import helmet from "helmet";
// import morgan from "morgan";
// import path from "path";
// import { fileURLToPath } from "url";
// import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
// import commentRoutes from "./routes/comments.js";
// import chatRoutes from "./routes/chat.js";
// import replyRoutes from "./routes/reply.js";
// import replyToReplyRoutes from "./routes/replyToReply.js";
// import messageRoutes from "./routes/message.js";
// import { register } from "./controllers/auth.js";
// import { createPost } from "./controllers/posts.js";
// import { verifyToken } from "./middleware/auth.js";
// import { addCoverPhoto, updateProfilePicture } from "./controllers/users.js";

/* CONFIGURATIONS */
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// dotenv.config();
const app = express();
app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(cors());
// app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/assets");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage });

/* ROUTES WITH FILES */
// app.post("/auth/register",  register);
// app.post("/auth/register", upload.single("picture"), register);
// app.post("/posts", verifyToken, upload.single("picture"), createPost);
// app.post("/posts", verifyToken, upload.single("picture"), createPost);
// app.patch("/users/:userId/coverphoto", upload.single("coverImage"), addCoverPhoto);
// app.patch("/users/:userId/profilepicture", upload.single("picture"), updateProfilePicture);

/* ROUTES */
// app.use("/auth", authRoutes);
// app.use("/users", userRoutes);
app.use("/posts", postRoutes);
// app.use("/comment", commentRoutes);
// app.use("/reply", replyRoutes);
// app.use("/replytoreply", replyToReplyRoutes);
// app.use("/chat", chatRoutes);
// app.use("/message", messageRoutes);

/* MONGOOSE SETUP */
const PORT = 3001;
mongoose
  .connect("mongodb+srv://elijahsmalachi:513119Emas@data.yr0udnb.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
