import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {T_Topic} from "src/modules/types.ts";
import {Col, Container, Row} from "reactstrap";
import {TopicMocks} from "src/modules/mocks.ts";
import mockImage from "assets/mock.png";
import 'src/App.css';


type TopicPageProps = {
    selectedTopic: T_Topic | null,
    setSelectedTopic: React.Dispatch<React.SetStateAction<T_Topic | null>>,
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const TopicPage = ({selectedTopic, setSelectedTopic, isMock, setIsMock}: TopicPageProps) => {
    const { id } = useParams<{id: string}>();

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/topics/${id}`,{ signal: AbortSignal.timeout(1000) })
            const data = await response.json()
            setSelectedTopic(data)
        } catch {
            createMock()
        }
    }

    const createMock = () => {
        setIsMock(true)
        setSelectedTopic(TopicMocks.find(topic => topic?.topic_id == parseInt(id as string)) as T_Topic)
    }

    useEffect(() => {
        if (!isMock) {
            fetchData()
        } else {
            createMock()
        }

        return () => setSelectedTopic(null)
    }, []);

    if (!selectedTopic) {
        return (
            <div>

            </div>
        )
    }

    return (
<Container>
    <Row>
        <Col md="3" className="d-flex justify-content-center">
            <img
                alt=""
                src={isMock ? mockImage as string : selectedTopic.photo_url}
                className="w-100 rounded-image" // Использование класса для стилей
            />
        </Col>
        <Col md="6">
            <h1 className="mb-3">{selectedTopic.name}</h1>
            <p className="fs-5">Описание: {selectedTopic.description}</p>
        </Col>
    </Row>
</Container>
    );
};

export default TopicPage