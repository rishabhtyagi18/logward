import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentsForm from "./CommentsForm";

const CommentsSection = ({
  name,
  time,
  comment,
  id,
  parentId,
  replies,
  setDeletionID,
  activeComment,
  setActiveComment,
  addComment,
  updateComments,
}) => {
  const isReplying =
    activeComment && activeComment.type === "reply" && activeComment.id === id;

  const isEditing =
    activeComment && activeComment.type === "edit" && activeComment.id === id;
  const level = parentId ? 2 : 1;
  return (
    <div>
      <div
        style={{
          display: "inline-flex",
          position: "relative",
          margin: "15px",
          paddingLeft: level === 1 ? 0 : "102px",
        }}
      >
        <div
          style={{
            width: level === 1 ? "750px" : "648px",
            backgroundColor: "#f6f6f6",
            padding: "15px",
            display: "block",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              padding: "2px",
            }}
          >
            <span>
              <b>{name}</b>
            </span>
            <span>{`${new Date(time).getDate()} ${new Date(
              time
            ).toLocaleDateString("default", {
              month: "short",
            })} ${new Date(time).getFullYear()}`}</span>
          </div>
          <div style={{ padding: "2px", paddingRight: "10px" }}>{comment}</div>
          <div style={{ padding: "2px" }}>
            {level === 1 ? (
              <Button
                style={{
                  textTransform: "none",
                  fontWeight: "700",
                  color: "#0094ff",
                  justifyContent: "flex-start",
                  paddingLeft: "0px",
                }}
                onClick={() => {
                  setActiveComment({ id: id, type: "reply" });
                }}
              >
                Reply
              </Button>
            ) : (
              ""
            )}
            <Button
              style={{
                textTransform: "none",
                paddingLeft: "0px",
                color: "#0094ff",
                fontWeight: "700",
                justifyContent: "flex-start",
              }}
              onClick={() => {
                setActiveComment({
                  id: id,
                  type: "edit",
                  name: name,
                  comment: comment,
                });
              }}
            >
              Edit
            </Button>
          </div>
        </div>
        <button
          style={{
            position: "absolute",
            zIndex: 2,
            color: "white",
            backgroundColor: "#575757",
            borderRadius: "50%",
            borderWidth: 0,

            borderWidth: "0px",
            marginTop: "38px",
            right: "-18px",
          }}
          onClick={() => {
            setDeletionID(id);
          }}
        >
          <DeleteIcon style={{ paddingTop: "3px" }} />
        </button>
      </div>
      {isReplying && (
        <CommentsForm
          formType="reply"
          onSubmit={addComment}
          parentId={activeComment.id}
        />
      )}

      {isEditing && (
        <CommentsForm
          formType="edit"
          ownID={activeComment.id}
          commentName={activeComment?.name}
          commentComment={activeComment?.comment}
          onSubmit={updateComments}
        />
      )}
      {replies.map((reply) => {
        return (
          <CommentsSection
            key={reply.id}
            name={reply.name}
            time={reply.time}
            comment={reply.comment}
            parentId={reply.parentId}
            id={reply.id}
            replies={[]}
            setDeletionID={setDeletionID}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            updateComments={updateComments}
          />
        );
      })}
    </div>
  );
};

export default CommentsSection;
