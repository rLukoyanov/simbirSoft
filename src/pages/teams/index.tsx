import { useEffect, useState } from "react";
import { Table, Spin, Input, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import Image from "next/image";

import axios from "axios";

import { TABLE_X, find } from "@/helpers";
import { ITable, ITeams } from "@/types";

const columns: ColumnsType<ITable> = [
    {
        title: "name",
        dataIndex: ["name"],
        key: "name",
    },
    {
        title: "crest",
        dataIndex: ["crest"],
        key: "crest",
        render: (url) => (
            <div>
                <Image width={50} height={50} src={url} alt="crest" />
            </div>
        ),
    },
    {
        title: "clubColors",
        dataIndex: "clubColors",
        key: "clubColors",
    },
    {
        title: "founded",
        dataIndex: ["founded"],
        key: "founded",
    },
    {
        title: "Детали",
        dataIndex: "id",
        key: "details",
        render: (url) => <a href={`teams/${url}`}>Детали</a>,
    },
];

const TeamsList = () => {
    const [teamsData, setTeamsData] = useState<ITeams>();
    const [messageApi, contextHolder] = message.useMessage();
    const [displayData, setDisplayData] = useState<any>();
    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axios.get("/api/teams");
                setTeamsData(data);
                setDisplayData(data.teams);
            } catch (err: any) {
                messageApi.open({
                    type: "error",
                    content: "Записи не найдены, попробуйте позже",
                });
            }
        };
        fetch();
    }, []);

    const handleChange = (e: any) => {
        const filteredIndexes = find(e.target.value, teamsData?.teams);

        const filteredArray: any = [];
        for (let i = 0; i < filteredIndexes.length; i++) {
            filteredArray.push(teamsData?.teams[filteredIndexes[i]]);
        }
        setDisplayData(filteredArray);
    };

    return (
        <div>
            {contextHolder}
            {teamsData ? (
                <div>
                    <Input
                        onChange={handleChange}
                        placeholder="Поиск (Чуствителен к регистру)"
                        style={{ marginBottom: 20 }}
                    />
                    <Table
                        scroll={{ x: TABLE_X }}
                        columns={columns}
                        dataSource={displayData}
                        rowKey="id"
                    />
                </div>
            ) : (
                <Spin size="large" />
            )}
        </div>
    );
};

export default TeamsList;
