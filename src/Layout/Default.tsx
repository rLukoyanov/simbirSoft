import React, { useState } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import { useRouter } from "next/router";

const { Header, Sider, Content } = Layout;

interface IProps {
    children: React.ReactNode;
}

export const Default = ({ children }: IProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["CompetitionList"]}
                    items={[
                        {
                            key: "CompetitionList",
                            icon: <UserOutlined />,
                            label: "Список лиг",
                            onClick: () => {
                                router.push("/competition");
                            },
                        },
                        {
                            key: "TeamsList",
                            icon: <VideoCameraOutlined />,
                            label: "Список команд",
                            onClick: () => {
                                router.push("/teams");
                            },
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0 }}>
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                            color: "#fff",
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};
