import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=paris+city&image_type=photo&category=travel`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const dataImg = await response.json();

    if (dataImg.total === 0) {
      return NextResponse.json({
        message:
          "https://cdn.pixabay.com/photo/2016/01/02/02/43/aerial-view-1117812_960_720.jpg",
      }, {status: 200});
    }

    const img = dataImg.hits[0].largeImageURL;
    return NextResponse.json({ message: img }, {status: 200});
  } catch (error) {

    console.log(error);
  }
}
