import { connectDB } from "../../util/database";

export default async function handler(req, res) {
  const { title, keywords, contents, imgSrc, timestamp } = req.body;

  try {
    const db = (await connectDB).db("Velog");
    const user = await db.collection("posts").insertOne({ title, keywords, contents, imgSrc, timestamp })
    res.status(200).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
