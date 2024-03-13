import React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";

const CommentsForm = ({
  formType,
  onSubmit,
  parentId = null,
  commentName,
  commentComment,
  ownID,
}) => {
  const [comment, setComment] = useState(commentComment || "");

  const [name, setName] = useState(commentName || "");
  const isPostDisabled = comment.length === 0 || name.length === 0;
  return (
    // <div
    //   style={{
    //     position: "relative",
    //     width: "750px",
    //   }}
    // >
    <div
      style={{
        width: formType === "comment" ? "750px" : "648px",
        // position: "absolute",
        // maxWidth: "750px",
        right: 0,
        backgroundColor: "#f6f6f6",
        padding: "15px",
        display: "block",
        margin: formType === "comment" ? "15px" : "0px",
        marginLeft: formType === "comment" ? "" : "118px",
      }}
    >
      <span style={{ fontWeight: "600" }}>
        {formType === "comment"
          ? "Comment"
          : formType === "reply"
          ? "Reply"
          : "Edit"}
      </span>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            placeholder="Name"
            variant="outlined"
            value={name}
            disabled={formType === "edit"}
            onChange={(e) => setName(e.target.value)}
            margin="dense"
            style={{ width: "100%", backgroundColor: "white" }}
            inputProps={{
              style: { height: "20px", backgroundColor: "white" },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            id="outlined-basic"
            placeholder="Reply"
            variant="outlined"
            value={comment}
            maxRows={4}
            onChange={(e) => setComment(e.target.value)}
            margin="dense"
            style={{ width: "100%", backgroundColor: "white" }}
            inputProps={{
              style: { minHeight: "40px", backgroundColor: "white" },
            }}
          />
        </Grid>
      </Grid>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          style={{ marginTop: "10px", backgroundColor: "#0094ff" }}
          disabled={isPostDisabled}
          onClick={() => {
            setName("");
            setComment("");
            onSubmit(comment, name, parentId, ownID);
          }}
          variant="contained"
        >
          POST
        </Button>
      </div>
    </div>
    // </div>
  );
};

export default CommentsForm;
