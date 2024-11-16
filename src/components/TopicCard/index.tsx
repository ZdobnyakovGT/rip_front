import {Button, Card, CardBody, CardImg, CardTitle} from "reactstrap";
import mockImage from "assets/mock.png";
import {Link} from "react-router-dom";
import {T_Topic} from "modules/types.ts";
import "src/App.css"

interface TopicCardProps {
    topic: T_Topic,
    isMock: boolean
}

const TopicCard = ({topic, isMock}: TopicCardProps) => {
    return (
        // <Card key={topic.topic_id} style={{width: '18rem', margin: "0 auto 50px", height: "calc(100% - 50px)" }}>
        <Card key={topic.topic_id} style={{
            width: '218px',
            height: '400px',
            backgroundColor: '#D0B175',
            borderRadius: '20px',
            textAlign: 'center',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column', 
            justifyContent: 'flex-start', 
            alignItems: 'center',  
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
            margin: '0 auto 50px',  
        }}
        >

            <CardImg
                src={isMock ? mockImage as string : topic.photo_url}
                style={{
                    width: "162px",
                    height: "252px",
                    borderRadius: "10px"  // Обновленный border-radius, одинаково для всех углов
                }}
            />
            <CardBody className="d-flex flex-column justify-content-between">
                <CardTitle tag="h5" style={{color: "white"}}>
                    {topic.name}
                </CardTitle>
                <Link to={`/topics/${topic.topic_id}`}>
                    <Button color="primary">
                        Подробнее
                    </Button>
                </Link>
            </CardBody>
        </Card>
    );
};

export default TopicCard


