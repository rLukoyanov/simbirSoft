import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

import { Table, Spin, DatePicker, message } from "antd";
import type { ColumnsType } from "antd/es/table";

import axios from "axios";
import Image from "next/image";

interface ColumnType {
    title: string;
    dataIndex: string[] | string;
    key: string;
    render?: Function;
}

const columns: ColumnsType<ColumnType> = [
    {
        title: "Местоположение",
        dataIndex: ["area", "name"],
        key: "area",
    },
    {
        title: "Команда 1",
        dataIndex: ["homeTeam", "crest"],
        key: "homeTeam",
        render: (url) => (
            <div>
                <Image width={50} height={50} src={url} alt="crest" />
            </div>
        ),
    },
    {
        title: "Команда 2",
        dataIndex: ["awayTeam", "crest"],
        key: "awayTeam",
        render: (url) => (
            <div>
                <Image width={50} height={50} src={url} alt="crest" />
            </div>
        ),
    },
    {
        title: "Победитель",
        dataIndex: ["score", "winner"],
        key: "winner",
        render: (team) => (
            <div>
                {team === "HOME_TEAM"
                    ? "Команда 1"
                    : team === "DRAW"
                    ? "Ничья"
                    : "Команда 2"}
            </div>
        ),
    },
];

const TeamCalendar = ({ query }: any) => {
    const [matchesData, setMatchesData] = useState<any>();
    const [messageApi, contextHolder] = message.useMessage();
    let searchParams = useSearchParams();
    const { push } = useRouter();

    useEffect(() => {
        const fetch = async () => {
            try {
                if (
                    searchParams.get("dateFrom") &&
                    searchParams.get("dateTo")
                ) {
                    const { data } = await axios.post(`/api/teams/getTeam/`, {
                        teamId: query.teamId,
                        dateFrom: searchParams.get("dateFrom"),
                        dateTo: searchParams.get("dateTo"),
                    });
                    setMatchesData(data);
                } else {
                    const { data } = await axios.post(`/api/teams/getTeam`, {
                        teamId: query.teamId,
                    });
                    setMatchesData(data);
                }
            } catch (err: any) {
                messageApi.open({
                    type: "error",
                    content: "Записи не найдены, попробуйте позже",
                });
            }
        };
        fetch();
    }, []);

    const handleDatePickerChange = async (date: any, dateString: string[]) => {
        push(
            `/teams/${query.teamId}?dateFrom=${dateString[0]}&dateTo=${dateString[1]}`
        );
        try {
            const { data } = await axios.post(`/api/teams/getTeam`, {
                teamId: query.teamId,
                dateFrom: dateString[0],
                dateTo: dateString[1],
            });
            setMatchesData(data);
        } catch (err: any) {
            messageApi.open({
                type: "error",
                content: "Записи не найдены, попробуйте позже",
            });
        }
    };

    return (
        <div>
            {contextHolder}
            <div style={{ margin: "20px 0 20px 0" }}>
                <h2>Фильры</h2>
                <DatePicker.RangePicker
                    format={"YYYY-MM-DD"}
                    onChange={handleDatePickerChange}
                />
            </div>
            {matchesData ? (
                <div>
                    <Table
                        scroll={{ x: 1000 }}
                        columns={columns}
                        dataSource={matchesData.matches}
                    />
                </div>
            ) : (
                <Spin size="large" />
            )}
        </div>
    );
};

TeamCalendar.getInitialProps = ({ query }: any) => {
    return { query };
};

export default TeamCalendar;
