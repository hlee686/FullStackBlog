
import { connectDB } from "../../util/database";

export default async function handler(req, res) {

  const { email, password } = req.body;

  try {
    const db = (await connectDB).db("Velog");
    const user = await db.collection("Velog").insertOne({ email, password})
    res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ message: 'Login failed' });
  }
}