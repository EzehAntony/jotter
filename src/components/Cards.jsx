import { React, useState } from "react";
import "./card.css";

function Cards({ data }) {
  /*   const color = ["#C1FFE3", "#FFEEBE", "#C2DEFF", "#F2CCFF", "#FFBECB"];
  const random = Math.floor(Math.random() * color.length);
 */
  const trimTitle = data.title.split(" ")[0];
  const sliceTitle = data.title.slice(0, 10);
  const sliceContent = data.content.slice(0, 70);
  const trimContent = data.content;


  return (
    <div id={data._id} className="card" >
      <header>
        {trimTitle?.length > 10 ? `${sliceTitle}...` : `${trimTitle}`}{" "}
      </header>
      {trimContent.length > 70 ? (
        <p className="content">{`${sliceContent}. . .`}</p>
      ) : (
        <p className="content">{sliceContent} </p>
      )}
    </div>
  );
}

export default Cards;
