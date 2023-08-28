import { connectDB } from "../../util/database";

export default async function handler(req, res) {
  const { email, password } = req.body;
  const db = (await connectDB).db("Velog");
  const user = await db.collection("posts").find().toArray();
  
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
}
