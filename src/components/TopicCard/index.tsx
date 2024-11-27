import {Button, Card, CardBody, CardImg, CardTitle} from "reactstrap";
import mockImage from "assets/mock.png";
import {Link} from "react-router-dom";
import {T_Topic} from "modules/types.ts";
import "src/App.css";
import { useAppSelector } from "src/core/store/hooks.ts";


interface TopicCardProps {
    topic: T_Topic;
    isMock: boolean;
    onAddToShow: (topicId: number) => void;
}
 
const TopicCard = ({topic, isMock, onAddToShow}: TopicCardProps) => {
    const { isAuth } = useAppSelector((state) => state.userAuth);

    return (
        <Card 
            key={topic.topic_id} 
            style={{
                width: '218px',
                height: '420px', // Увеличенная высота для размещения двух кнопок
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
                    height: "230px",
                    borderRadius: "10px"  
                }}
            />
            <CardBody className="d-flex flex-column justify-content-between align-items-center">
                <CardTitle tag="h5" style={{color: "white"}}>
                    {topic.name}
                </CardTitle>
                <div className="d-flex flex-column gap-2"> {/* Контейнер для кнопок с отступами */}
                    <Link to={`/topics/${topic.topic_id}`}>
                        <Button color="primary">
                            Подробнее
                        </Button>
                    </Link>
                    {isAuth && ( // Условно рендерим кнопку "Добавить"
                        <Button color="primary" onClick={() => onAddToShow(topic.topic_id)}>
                            Добавить
                        </Button>
                    )}
                </div>
            </CardBody>
        </Card>
    );
};

export default TopicCard;
