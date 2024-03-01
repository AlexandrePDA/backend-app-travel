import { NextApiRequest, NextApiResponse } from "next";
import error from "next/error";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("req.body : ", req.body);
  const destination = req.body.message;
  console.log("destination", destination);
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${destination}+city&image_type=photo&category=travel`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    const dataImg = await response.json();
    console.log(dataImg);

    if (dataImg.total === 0) {
      return res.status(200).json({
        message:
          "https://cdn.pixabay.com/photo/2016/01/02/02/43/aerial-view-1117812_960_720.jpg",
      });
    }

    const img = dataImg.hits[0].largeImageURL;
    res.status(200).json({ message: img });
  } catch (error) {}
  res.status(400).json({ message: error });
}
