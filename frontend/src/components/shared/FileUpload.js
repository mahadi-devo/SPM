import React from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

const fileUploader = ({
  noOfFiles,
  multiple,
  input,
  fileTypes,
  getFileCallback,
}) => {
  const handleChangeStatus = async (e) => {
    if (e.meta.status === "done") {
      return await getFileCallback(e.file);
    } else {
      return await getFileCallback(null);
    }
  };

  return (
    <Dropzone
      onChangeStatus={handleChangeStatus}
      maxFiles={noOfFiles}
      multiple={multiple}
      styles={{ dropzone: { minHeight: 100, maxHeight: 100 } }}
      inputContent={input}
      canRemove={true}
    />
  );
};

export default fileUploader;
