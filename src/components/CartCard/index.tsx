import { Button, Card, CardImg, CardTitle } from "reactstrap";
import { T_Topic } from "modules/types.ts";
import "src/App.css";

interface CartCardProps {
  topic: T_Topic;
  onDetailsClick: () => void;
  onRemoveClick: (topicId: number) => void; // Добавлено
  onCheckboxToggle: (topicId: number) => void;
  isChecked: boolean;
}

const CartCard = ({
  topic,
  onDetailsClick,
  onRemoveClick, // Передаем функцию
  onCheckboxToggle,
  isChecked,
}: CartCardProps) => {
  return (
    <Card
      style={{
        height: "80px",
        width: "100%",
        backgroundColor: "#D0B175",
        borderRadius: "10px",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        gap: "15px",
      }}
    >
      {/* Левая секция: Изображение */}
      <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
        <CardImg
          src={topic.photo_url || "placeholder.jpg"}
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Средняя секция: Заголовок */}
      <div
        style={{
          flexGrow: 1,
          textAlign: "left",
        }}
      >
        <CardTitle
          tag="h5"
          style={{
            margin: "0",
            color: "white",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {topic.name}
        </CardTitle>
      </div>

      {/* Правая секция: Кнопки */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexShrink: 0,
        }}
      >
        <Button
          color="primary"
          onClick={onDetailsClick}
          style={{
            backgroundColor: "#27496D",
            borderColor: "#27496D",
            fontWeight: "bold",
            borderRadius: "20px",
            padding: "5px 15px",
          }}
        >
          Подробнее
        </Button>
        <Button
          color="primary"
          onClick={() => onRemoveClick(topic.topic_id)} // Вызов функции удаления
          style={{
            backgroundColor: "#27496D",
            borderColor: "#27496D",
            fontWeight: "bold",
            borderRadius: "20px",
            padding: "5px 15px",
          }}
        >
          Убрать
        </Button>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onCheckboxToggle(topic.topic_id)}
          style={{
            width: "20px",
            height: "20px",
            cursor: "pointer",
          }}
        />
      </div>
    </Card>
  );
};

export default CartCard;
