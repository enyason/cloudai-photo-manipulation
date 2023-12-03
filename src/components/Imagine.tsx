import {Flex, Image} from "antd";
import Search from "antd/lib/input/Search";
import {useState} from "react";
import apiClient from "../api/ReplicateApiClient.ts";

const Imagine = () => {

    const [imgSrc, setImgSrc] = useState("")
    const [loading, setLoading] = useState(false)

    function generateImage(query: string) {
        setLoading(true)
        apiClient.generateImage(query)
            .then((data) => {
                const imageUrl = data.output[0];
                setImgSrc(imageUrl)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            });
    }


    return (
        <Flex vertical={true} gap={10}>
            <Search
                style={{width: "500px"}}
                placeholder="Describe an image to generate"
                enterButton="Submit"
                disabled={loading}
                loading={loading}
                onSearch={(value) => {
                    (value.trim().length > 5) && generateImage(value)
                }}
            />

            {(imgSrc !== '') && (
                <Image
                    height="50%"
                    width="50%"
                    src={imgSrc}
                    alt="Your Image Alt Text"
                />
            )}
        </Flex>
    );
};

export default Imagine;