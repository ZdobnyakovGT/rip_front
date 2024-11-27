import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Input } from "reactstrap";
import { api } from "src/api";
import CartCard from "components/CartCard";
import { useNavigate } from "react-router-dom";

const CartShowPage: React.FC = () => {
  const navigate = useNavigate();
  const { showId } = useParams<{ showId: string }>();
  const [showDetails, setShowDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [checkedTopics, setCheckedTopics] = useState<number[]>([]);

  const [showName, setShowName] = useState<string>("");
  const [showDate, setShowDate] = useState<Date>();
  const [showTime, setShowTime] = useState<string>("");
  const [showPlace, setShowPlace] = useState<string>("");

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        setLoading(true);
        const response = await api.shows.showsRead(showId!);
        setShowDetails(response.data);

        setShowName(response.data.show_name || "");
        setShowDate(response.data.show_date);
        setShowTime(response.data.show_time || "");
        setShowPlace(response.data.show_place || "");
      } catch (err) {
        console.error("Error fetching show details:", err);
        setError("Не удалось загрузить данные выставки.");
      } finally {
        setLoading(false);
      }
    };

    if (showId) {
      fetchShowDetails();
    }
  }, [showId]);

  const handleCheckboxToggle = (topicId: number) => {
    setCheckedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleRemoveTopic = async (topicId: number) => {
    try {
      await api.shows.showsDeleteTopicDelete(showId!, topicId.toString());
      console.log(`Topic ${topicId} removed successfully`);

      setShowDetails((prev: any) => ({
        ...prev,
        topics: prev.topics.filter((topic: any) => topic.topic_id !== topicId),
      }));
    } catch (err) {
      console.error(`Error removing topic ${topicId}:`, err);
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        show_name: showName,
        show_date: showDate,
        show_time: showTime,
        show_place: showPlace,
      };

      await api.shows.showsUpdateUpdate(showId!, payload);
      console.log("Show details updated successfully");
      await api.shows.showsUpdateStatusUserUpdate(showId!);
      console.log("User status updated successfully");
      navigate("/topics");
    } catch (err) {
      console.error("Error saving show details:", err);
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <Container>
      <Row
        className="mb-4"
        style={{
          backgroundColor: "#D0B175",
          padding: "10px 20px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px", // Дополнительный отступ между элементами
        }}
      >
        <Col xs="2">
          <span style={{ fontWeight: "bold" }}>Выставка №{showId}</span>
        </Col>
        <Col xs="2">
          <span>Название:</span>
          <Input
            type="text"
            value={showName}
            onChange={(e) => setShowName(e.target.value)}
            style={{
              display: "inline-block",
              width: "100%",
            }}
            disabled={showDetails?.status !== 1}
          />
        </Col>
        <Col xs="2">
          <span>Дата:</span>
          <Input
            type="date"
            value={showDate?.toString().slice(0, 10)}
            onChange={(e) => setShowDate(new Date(e.target.value))}
            style={{
              display: "inline-block",
              width: "100%",
            }}
            disabled={showDetails?.status !== 1}
          />
        </Col>
        <Col xs="2">
          <span>Время:</span>
          <Input
            type="time"
            value={showTime}
            onChange={(e) => setShowTime(e.target.value)}
            style={{
              display: "inline-block",
              width: "100%",
            }}
            disabled={showDetails?.status !== 1}
          />
        </Col>
        <Col xs="2">
          <span>Аудитория:</span>
          <Input
            type="text"
            value={showPlace}
            onChange={(e) => setShowPlace(e.target.value)}
            style={{
              display: "inline-block",
              width: "100%",
            }}
            disabled={showDetails?.status !== 1}
          />
        </Col>
      </Row>

      {showDetails?.status === 1 && (
        <Row className="mb-3">
          <Col className="d-flex justify-content-start gap-3">
            <Button color="primary" onClick={handleSave}>
              Сохранить
            </Button>
            <Button color="danger" onClick={() => console.log("Удаление выставки")}>
              Удалить
            </Button>
          </Col>
        </Row>
      )}

      <Row>
        {showDetails.topics?.map((topic: any) => (
          <Col key={topic.topic_id} xs="12" className="mb-4">
            <CartCard
              topic={topic}
              onDetailsClick={() => navigate(`/topics/${topic.topic_id}`)}
              onRemoveClick={
                showDetails?.status === 1 ? handleRemoveTopic : undefined
              }
              onCheckboxToggle={handleCheckboxToggle}
              isChecked={checkedTopics.includes(topic.topic_id)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CartShowPage;
