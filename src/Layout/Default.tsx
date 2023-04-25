import React, { useState } from "react";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import { useRouter } from "next/router";

const { Header, Sider, Content } = Layout;

interface PropsTypes {
    children: React.ReactNode;
}

export const Default = ({ children }: PropsTypes) => {
    const router = useRouter();
    return (
        <Layout>
            <Header style={{ background: "#fff" }}>
                <Menu
                    theme="light"
                    mode="horizontal"
                    items={[
                        {
                            key: "CompetitionList",
                            icon: <UploadOutlined />,
                            label: "Список лиг",
                            onClick: () => {
                                router.push("/competition");
                            },
                        },
                        {
                            key: "TeamsList",
                            icon: <UserOutlined />,
                            label: "Список команд",
                            onClick: () => {
                                router.push("/teams");
                            },
                        },
                    ]}
                />
            </Header>
            <Layout>
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
