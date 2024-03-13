import CommentsForm from "./CommentsForm";
import CommentsSection from "./CommentsSection";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function Comments() {
  const [sortNewestFirst, setSortNewestFirst] = useState(true);

  const [activeComment, setActiveComment] = useState(null);
  const [comments, setComments] = useState(
    JSON.parse(localStorage.getItem("commentsALL")) || []
  );

  const [rootComments, setRootComments] = useState([]);

  useEffect(() => {
    let sortedComments = [...comments];
    if (comments.length > 0) {
      if (!sortNewestFirst) {
        sortedComments.sort((a, b) => a.id - b.id);
      } else {
        sortedComments.sort((b, a) => a.id - b.id);
      }
    }
    setComments(sortedComments);
    setRootComments(
      sortedComments.filter((comment) => comment.parentId === null)
    );
  }, [comments, sortNewestFirst]);

  const getReplies = (parentId) => {
    return comments.filter((comment) => comment.parentId === parentId);
  };

  const updateComments = (comment, name, parentId, ownID) => {
    const updatedComments = comments.map((newComment) => {
      if (newComment.id === ownID) {
        return {
          ...newComment,
          comment: comment,
        };
      }
      return newComment;
    });
    setComments(updatedComments);
    setActiveComment({});
    window.localStorage.setItem("commentsALL", JSON.stringify(updatedComments));
  };

  const addComment = (comment, name, parentId = null) => {
    let newComment = {
      id: Date.now(),
      name: name,
      time: new Date(),
      comment: comment,
      parentId: parentId,
    };

    window.localStorage.setItem(
      "commentsALL",
      JSON.stringify([...comments, newComment])
    );
    setActiveComment({});
    setComments([...comments, newComment]);
  };
  const [deletionID, setDeletionID] = useState(null);

  useEffect(() => {
    if (deletionID > 0) {
      if (window.confirm("Are you sure you want to delete this comment?")) {
        window.localStorage.setItem(
          "commentsALL",
          JSON.stringify(
            comments.filter((comment) => comment.id !== deletionID)
          )
        );
        setComments(comments.filter((comment) => comment.id !== deletionID));
      }
    }
  }, [deletionID]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        // width: "750px",
      }}
    >
      <div
        style={{
          display: "flex",
          //width: "750px",
          // justifyContent: "flex-end",
          paddingLeft: "25px",
        }}
      >
        <CommentsForm formType="comment" onSubmit={addComment} />
      </div>

      {rootComments.length > 1 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "823px",
          }}
        >
          Sort By : Date and Time{" "}
          <Button onClick={() => setSortNewestFirst(!sortNewestFirst)}>
            {sortNewestFirst ? (
              <ArrowUpwardIcon style={{ color: "black" }} />
            ) : (
              <ArrowDownwardIcon style={{ color: "black" }} />
            )}
          </Button>
        </div>
      ) : (
        ""
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        {rootComments.map((comment) => {
          return (
            <CommentsSection
              key={comment.id}
              name={comment.name}
              time={comment.time}
              id={comment.id}
              comment={comment.comment}
              parentId={comment.parentId}
              replies={getReplies(comment.id)}
              setDeletionID={setDeletionID}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
              updateComments={updateComments}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Comments;
