import React from "react";
import Image from "next/image";
import "../styles/main.scss";
import Link from "next/link";

interface RecipeItemProps {
  image: string;
  title: string;
  time: string;
  link: string;
}

const RecipeItem: React.FC<RecipeItemProps> = ({ image, title, time, link }) => {
  return (
    <div className="suggestions-item">
        <div className="suggestions-item__imgbox">
            <Image
                src={image}
                alt={`${title} Image`}
                unoptimized={true}
                className="suggestions-item__imgbox_img"
                fill={true}
            />
        </div>
        <h3 className="suggestions-item__title">{title}</h3>
        <p className="suggestions-item__time">Time: <span className="suggestions-item__time_value">{time}</span></p>
        <Link href={link} className="suggestions-item__button">View</Link>
    </div>
  );
};

export default RecipeItem;
