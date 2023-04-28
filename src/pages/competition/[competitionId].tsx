import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import Image from "next/image";

import axios from "axios";

import { Table, Spin, DatePicker, message, Descriptions } from "antd";
import type { ColumnsType } from "antd/es/table";

import { ITable } from "@/types";
import { TABLE_X } from "@/helpers";

const columns: ColumnsType<ITable> = [
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
                {url ? (
                    <Image width={50} height={50} src={url} alt="crest" />
                ) : (
                    <div></div>
                )}
            </div>
        ),
    },
    {
        title: "Команда 2",
        dataIndex: ["awayTeam", "crest"],
        key: "awayTeam",
        render: (url) => (
            <div>
                {url ? (
                    <Image width={50} height={50} src={url} alt="crest" />
                ) : (
                    <div></div>
                )}
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
    {
        title: "Счет",
        dataIndex: ["score", "fullTime"],
        key: "fullTime",
        render: (date) => (
            <div>
                {date.home}:{date.away}
            </div>
        ),
    },
    {
        title: "Дата",
        dataIndex: ["utcDate"],
        key: "date",
        render: (date) => <div>{date.slice(0, -10)}</div>,
    },
];

const CompetitionCalendar = ({ query }: any) => {
    const [matchesData, setMatchesData] = useState<any>();
    const [displayData, setDisplayData] = useState<any>();
    const [messageApi, contextHolder] = message.useMessage();
    const { push }: any = useRouter();
    let searchParams = useSearchParams();

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axios.post(
                    `/api/competitions/getMatches`,
                    {
                        competitionId: String(query.competitionId),
                        dateFrom: searchParams.get("dateFrom"),
                        dateTo: searchParams.get("dateTo"),
                    }
                );
                setMatchesData(data);
                setDisplayData(data.matches);
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
            `/competition/${query.competitionId}?dateFrom=${dateString[0]}&dateTo=${dateString[1]}`
        );
        try {
            const { data } = await axios.post(`/api/competitions/getMatches`, {
                competitionId: query.competitionId,
                dateFrom: dateString[0],
                dateTo: dateString[1],
            });
            setMatchesData(data);
            setDisplayData(data.matches);
        } catch (err: any) {
            messageApi.open({
                type: "error",
                content: "Записи не найдены",
            });
        }
    };

    return (
        <div>
            {contextHolder}
            <div style={{ margin: "20px 0 20px 0" }}>
                <h2>Фильры</h2>
                <DatePicker.RangePicker
                    onChange={handleDatePickerChange}
                    format={"YYYY-MM-DD"}
                />
            </div>
            {matchesData ? (
                <div>
                    <Descriptions>
                        <Descriptions.Item label="Название">
                            {matchesData.competition.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Тип">
                            {matchesData.competition.type}
                        </Descriptions.Item>
                        <Descriptions.Item label="Код">
                            {matchesData.competition.code}
                        </Descriptions.Item>
                    </Descriptions>

                    <Image
                        width={50}
                        height={50}
                        src={matchesData.competition.emblem}
                        alt="emblem"
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

CompetitionCalendar.getInitialProps = ({ query }: any) => {
    return { query };
};

export default CompetitionCalendar;
