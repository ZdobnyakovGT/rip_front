import React, { useEffect, useState } from "react";
import { Table, Container, Row, Col, Spinner, Alert } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { api } from "src/api";

interface Show {
  show_id: number;
  show_name: string;
  show_date: string;
  show_time: string;
  show_place: string;
  status: string;
  topics_count: number; // Массив тем
}

const ShowsPage: React.FC = () => {
  const navigate = useNavigate(); // Используем хук навигации
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserShows = async () => {
      try {
        setLoading(true);
        const response = await api.shows.showsSearchList(); // Вызов API метода
        console.log("Response:", response.data); // Проверяем ответ API
        setShows(response.data); // Устанавливаем данные заявок
      } catch (err) {
        console.error("Error fetching user shows:", err);
        setError("Не удалось загрузить данные заявок.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserShows();
  }, []);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <Spinner color="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <Alert color="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h2>Ваши выставки</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Название</th>
                <th>Дата</th>
                <th>Время</th>
                <th>Аудитория</th>
                {/* <th>Статус</th> */}
                <th>Количество тем</th> {/* Новый столбец */}
              </tr>
            </thead>
            <tbody>
              {shows.map((show, index) => (
                <tr
                  key={show.show_id}
                  style={{ cursor: "pointer" }} // Указатель при наведении
                  onClick={() => navigate(`/shows/${show.show_id}`)} // Навигация на страницу заявки
                >
                  <td>{index + 1}</td>
                  <td>{show.show_name}</td>
                  <td>{show.show_date}</td>
                  <td>{show.show_time}</td>
                  <td>{show.show_place}</td>
                  {/* <td>{show.status}</td> */}
                  <td>{show.topics_count}</td> {/* Количество услуг */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ShowsPage;
