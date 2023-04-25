import { useEffect, useState } from "react";
import { Table, Spin, Input, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import { find } from "@/helpers";
import Image from "next/image";

interface ColumnType {
    title: string;
    dataIndex: string[] | string;
    key: string;
    render?: Function;
}

const columns: ColumnsType<ColumnType> = [
    {
        title: "Название",
        dataIndex: ["name"],
        key: "name",
    },
    {
        title: "Место",
        dataIndex: ["area", "name"],
        key: "area",
    },
    {
        title: "Эмблема",
        dataIndex: ["emblem"],
        key: "emblem",
        render: (url) => (
            <div>
                <Image width={50} height={50} src={url} alt="emblem" />
            </div>
        ),
    },
    {
        title: "Тип",
        dataIndex: "type",
        key: "type",
    },
    {
        title: "Детали",
        dataIndex: "id",
        key: "details",
        render: (url) => <a href={`competition/${url}`}>Детали</a>,
    },
];

const CompetitionList = () => {
    const [competitionsData, setCompetitionsData] = useState<any>();
    const [displayData, setDisplayData] = useState<any>();
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axios.get("/api/competitions");
                setCompetitionsData(data);
                setDisplayData(data.competitions);
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
        const filteredIndexes = find(
            e.target.value,
            competitionsData.competitions
        );

        const filteredArray: any = [];
        for (let i = 0; i < filteredIndexes.length; i++) {
            filteredArray.push(
                competitionsData.competitions[filteredIndexes[i]]
            );
        }
        console.info(filteredArray);
        setDisplayData(filteredArray);
    };

    return (
        <div>
            {contextHolder}
            {competitionsData ? (
                <div>
                    <Input
                        onChange={handleChange}
                        placeholder="Поиск (Чуствителен к регистру)"
                        style={{ marginBottom: 20 }}
                    />
                    <Table
                        scroll={{ x: 1000 }}
                        columns={columns}
                        dataSource={displayData}
                    />
                </div>
            ) : (
                <Spin size="large" />
            )}
        </div>
    );
};

export default CompetitionList;
