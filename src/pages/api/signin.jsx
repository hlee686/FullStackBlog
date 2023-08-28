import { connectDB } from "../../util/database";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { email, password } = req.body;
  const db = (await connectDB).db("Velog");
  const user = await db.collection("Velog").findOne({ email, password });
  
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
}
