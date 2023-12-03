import {
    BlockOutlined, BoldOutlined, FileImageOutlined, RotateLeftOutlined
} from '@ant-design/icons';
import {Layout, Menu, MenuProps} from 'antd';
import {useState} from "react";
import Imagine from "./components/Imagine.tsx";
import ObjectRemover from "./components/ObjectRemover.tsx";
import BackgroundRemover from "./components/BackgroundRemover.tsx";
import Restaurer from "./components/Restaurer.tsx";

const {Header, Sider, Content} = Layout;

function App() {

    const menuItems = [
        {
            key: '1',
            icon: <FileImageOutlined/>,
            label: 'Imagine'
        },
        {
            key: '2',
            icon: <BlockOutlined/>,
            label: 'Obj Remover',
        },
        {
            key: '3',
            icon: <BoldOutlined/>,
            label: 'Bg Remover',
        },
        {
            key: '4',
            icon: <RotateLeftOutlined/>,
            label: 'Restaurer',
        },
    ]

    const sideBarComponents = [
        <Imagine/>,
        <ObjectRemover/>,
        <BackgroundRemover/>,
        <Restaurer/>
    ]


    const [itemId, setItemId] = useState("1");


    const onClickHandler: MenuProps['onClick'] = (e) => {
        setItemId(e.key)
    };

    return (
        <Layout className="layout">
            <Sider trigger={null} collapsible width={200}>
                <div className="logo">Cloud-IMG</div>
                <Menu
                    theme={"dark"}
                    onClick={onClickHandler}
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={menuItems}

                />
            </Sider>
            <Layout className="site-layout">
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                    }}
                >
                    {sideBarComponents[parseInt(itemId) - 1]}

                </Content>
            </Layout>
        </Layout>
    );
}

export default App;
