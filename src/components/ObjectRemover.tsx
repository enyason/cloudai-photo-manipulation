import {Button, Flex, Image, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {useState} from "react";
import {RcFile} from "antd/lib/upload";
import apiClient from "../api/ReplicateApiClient.ts";
import Search from "antd/lib/input/Search";
import {isString} from "antd/es/button";

const ObjectRemover = () => {

    const [image, setImage] = useState<RcFile>()
    const [imageAsUrl, setImageAsUrl] = useState("")
    const [editedImgSrc, setEditedImgSrc] = useState("")
    const [loading, setLoading] = useState(false)

    function handleChange(file: RcFile) {
        setImage(file)
        setImageAsUrl(URL.createObjectURL(file));
    }

    function removeObjectFromPhoto(objectDescription: string) {
        setLoading(true)
        apiClient.removeObjectFromImage(image as RcFile, objectDescription)
            .then((data) => {
                if (isString(data.output)) {
                    setEditedImgSrc(data.output)
                }
                console.log("response", data)
                setLoading(false)

            }).catch((error) => {
            console.error("error", error)
            setLoading(false)

        })
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

                {(image !== null) && <Search
                    style={{width: "20vw"}}
                    placeholder="Objects(s) to remove"
                    enterButton="Submit"
                    disabled={loading}
                    loading={loading}
                    onSearch={(value) => {
                        (value.trim().length > 0) && removeObjectFromPhoto(value)
                    }}
                />

                    //     <Button
                    //     type="primary"
                    //     disabled={loading}
                    //     loading={loading}
                    //     onClick={() => {
                    //         removeObjectFromPhoto("")
                    //     }}
                    //     size={"middle"}>
                    //     Remove Background
                    // </Button>


                }


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

export default ObjectRemover;