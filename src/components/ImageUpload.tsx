import React from "react";
import "antd/dist/reset.css";
import { Upload, Button, message, Alert, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { api } from "./common/http-common";

class ImageUpload extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      fileList: [],
      uploading: false,
      imgPosted: [],
      isUploadOk: false,
    };
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file: any) => {
      formData.append("upload", file, file.name);
    });

    this.setState({ uploading: true });

    fetch(`${api.uri}/images`, {
      method: "POST",
      body: formData,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        message.success("Upload successfully!");
        this.setState({ isUploadOk: true, imgPosted: result });
        console.log("Uploaded result:", result);
      })
      .catch((error) => {
        message.error("Upload failed.");
        console.error("Error:", error);
      })
      .finally(() => {
        this.setState({ uploading: false });
      });
  };

  render() {
    const { Title } = Typography;
    const { uploading, fileList, isUploadOk, imgPosted } = this.state;

    const uploadProps = {
      onRemove: (file: any) => {
        this.setState((state: any) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return { fileList: newFileList };
        });
      },
      beforeUpload: (file: any) => {
        this.setState((state: any) => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-xl mx-auto">
        <Title level={3} className="text-blue-800 mb-4">
          Select and Upload Pet Image
        </Title>

        <div className="flex flex-col space-y-4">
          <Upload {...uploadProps} className="w-full">
            <Button
              icon={<UploadOutlined />}
              className="w-full flex justify-center bg-orange-500 text-white hover:bg-orange-600"
            >
              Select File
            </Button>
          </Upload>

          <Button
            type="primary"
            onClick={this.handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
            className="w-full bg-green-500 hover:bg-green-600 text-white"
          >
            {uploading ? "Uploading..." : "Start Upload"}
          </Button>

          {isUploadOk && (
            <div className="mt-4">
              <p className="text-red-500 mb-2">Image uploaded successfully:</p>
              <Alert
                message={JSON.stringify(imgPosted)}
                type="success"
                className="break-words"
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ImageUpload;
