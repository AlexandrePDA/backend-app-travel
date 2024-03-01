"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [img, setImg] = useState("");
  const [img2, setImg2] = useState("");

  const handleInputChange = (event: any) => {
    setInputValue(event?.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/searchImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      });
      const data = await response.json();
      console.log(data.message)
      setImg(data.message);
      if (response.status === 200) {
        setInputValue("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGenerate = async () => {
    try {
      const response = await fetch("/api/getImage", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setImg2(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Entrez votre texte..."
          style={{ color: "black" }}
        />
        <button type="submit">Envoyer</button>
      </form>
      <button onClick={handleGenerate}>generation img</button>
      <p>Image genere a partir du form : </p>
      {img && <Image src={img} alt="image" width={500} height={500} />}
      <p>Image genere a partir du button : </p>
      {img2 && <Image src={img2} alt="image" width={500} height={500} />}
    </div>
  );
}
