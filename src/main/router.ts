import express, {Request, Response} from 'express';

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello Server!");
});

router.post(
  "/users",
  async (req:Request, res:Response) => {
    // create
  }
);

export default router