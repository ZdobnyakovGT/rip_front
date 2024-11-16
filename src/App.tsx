import {useEffect, useState} from "react";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import TopicPage from "pages/TopicPage";
import TopicsPage from "pages/TopicsPage";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import {T_Topic} from "src/modules/types.ts";
import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage";
import "./App.css"

// const { invoke } = (window as any).__Tauri__?.tauri;

function App() {
  
  const [topics, setTopics] = useState<T_Topic[]>([])
  const [selectedTopic, setSelectedTopic] = useState<T_Topic | null>(null)
  const [isMock, setIsMock] = useState(false);
  const [topicName, setTopicName] = useState<string>("")


  useEffect(() => {
    if ((window as any).__Tauri__?.tauri) {
      const { invoke } = (window as any).__Tauri__.tauri;
      invoke('create')
        .then((response: any) => console.log(response))
        .catch((error: any) => console.log(error));
    } else {
      console.error("Tauri не инициализирован.");
    }
  }, []);
  
 
    return (
        <div>
            <Header/>
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs selectedTopic={selectedTopic} />
                </Row>
                <Row>
                  <BrowserRouter basename="/rip_front">
                    <Routes>
						            <Route path="/" element={<HomePage />} />
                        <Route path="/topics/" element={<TopicsPage topics={topics} setTopics={setTopics} isMock={isMock} setIsMock={setIsMock} topicName={topicName} setTopicName={setTopicName}/>} />
                        <Route path="/topics/:id" element={<TopicPage selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} isMock={isMock} setIsMock={setIsMock}/>} />
                    </Routes>
                  </BrowserRouter>
                </Row>
            </Container>
        </div>
    )
}

export default App