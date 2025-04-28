import { useEffect, useState } from "react";

export default function PostContent(props) {
  const { image1, image2, mainQuestion, metaData, subQuestions, comments } =
    props.data;
  const { userName, timeOfPost, filedUnder, profilePic } = metaData;

  function FormattedDate({ isoString }) {
    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
      const date = new Date(isoString);
      const formatted = date.toLocaleString("tr-TR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
      setFormattedDate(formatted);
    }, [isoString]);

    return <span>{formattedDate}</span>;
  }

  const subQuestionElements = subQuestions.map((question) => (
    <li key={crypto.randomUUID()} className="sub-question">
      <a href={question.link} target="_blank">
        {question.text}{" "}
      </a>
    </li>
  ));

  return (
    <div>
      <div className="top-post-overall-container">
        <div className="top-post-data-container">
          <img className="profile-pic" src={profilePic} />
          <div className="user-and-category-container">
            <p className="post-category">
              <a href="#">{filedUnder}</a>
            </p>
            <p className="post-username">
              <a href="#">@{userName}</a>{" "}
            </p>
          </div>
        </div>
        <img className="dots-icon" src="/images/icons/dots.svg" />
      </div>
      <h3 className="post-headline">{mainQuestion}</h3>
      <div className="post-images-and-sub-questions-container">
        <div className="post-images-container">
          <img className="post-image" src={image1} />
          <img className="post-image" src={image2} />
        </div>
        <div className="sub-questions-container">
          <ul>{subQuestionElements}</ul>
        </div>
      </div>
      <div className="bottom-post-data-container">
        <p>
          <FormattedDate isoString={timeOfPost} />
        </p>
        <p>
          <a>{comments.length} yorum</a>
        </p>
      </div>
    </div>
  );
}
