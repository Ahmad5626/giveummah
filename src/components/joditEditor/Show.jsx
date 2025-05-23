import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";

const JoditComponent = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={{
        uploader: {
          insertImageAsBase64URI: true,
        },
        height: 400,
      }}
      onBlur={newContent => setContent(newContent)} // use onBlur instead of onChange
    />
  );
};

export default JoditComponent;