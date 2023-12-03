import {useState} from 'react';
import {Button, Flex, Image, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {RcFile} from "antd/lib/upload";
import apiClient from "../api/ReplicateApiClient.ts";
import {isString} from "antd/es/button";

const BackgroundRemover = () => {

    const [image, setImage] = useState<RcFile>()
    const [imageAsUrl, setImageAsUrl] = useState("")
    const [editedImgSrc, setEditedImgSrc] = useState("")
    const [loading, setLoading] = useState(false)


    function handleChange(file: RcFile) {
        setImage(file)
        setImageAsUrl(URL.createObjectURL(file));
    }

    function removeImageBackground() {
        setLoading(true)
        apiClient.removeBackgroundFromImage(image as RcFile)
            .then((data) => {
                const imageUrl = data.output;
                if (isString(imageUrl)) setEditedImgSrc(imageUrl)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            });
    }

    return (

        <Flex vertical={true} gap={10}>

            <Flex vertical={false} gap={10}>


                <Upload
                    showUploadList={false}
                    disabled={loading}
                    beforeUpload={handleChange}>
                    <Button
                        disabled={loading}
                        icon={<UploadOutlined/>}
                        size={"middle"}>Import photo</Button>
                </Upload>

                {(imageAsUrl !== "") && <Button
                    type="primary"
                    disabled={loading}
                    loading={loading}
                    onClick={removeImageBackground}
                    size={"middle"}>
                    Remove Background
                </Button>}


            </Flex>


            <Flex vertical={false} gap={40}>

                {(imageAsUrl !== "") && (
                    <Image
                        height="40%"
                        width="40%"
                        src={imageAsUrl}
                        alt="Your Image Alt Text"
                    />
                )}

                {(editedImgSrc !== '') && (
                    <Image
                        height="40%"
                        width="40%"
                        src={editedImgSrc}
                        alt="Your Image Alt Text"
                    />
                )}
            </Flex>

        </Flex>

    )
}

export default BackgroundRemover;