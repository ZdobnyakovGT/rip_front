import {useEffect, useState} from "react";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import TopicPage from "pages/TopicPage";
import TopicsPage from "pages/TopicsPage";

import {Route, Routes} from "react-router-dom";
import {T_Topic} from "src/modules/types.ts";

import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage";
import "./App.css"


// import { invoke } from "@tauri-apps/api/tauri";
// import { invoke } from '@tauri-apps/api';
// import  tauriApi  from '@tauri-apps/api';
import { invoke } from '@tauri-apps/api/core'
// import { tauri } from '@tauri-apps/api/core'
// import { invoke } from "@tauri-apps/api/";
// const {invoke} = (window as any).__TAURI__.tauri;






function App() {
  
    const [topics, setTopics] = useState<T_Topic[]>([])
    const [selectedTopic, setSelectedTopic] = useState<T_Topic | null>(null)
    const [isMock, setIsMock] = useState(false);
    const [topicName, setTopicName] = useState<string>("")


    // useEffect(() => {
    //   console.log('Tauri object:', (window as any).__TAURI__);
    //   if ((window as any).__Tauri__?.tauri) {
    //     const { invoke } = (window as any).__Tauri__.tauri;
    //     invoke('create')
    //       .then((response: any) => console.log(response))
    //       .catch((error: any) => console.log(error));
    //   } else {
    //     console.error("Tauri не инициализирован.");
    //   }
    // }, []);


          // const { invoke } = (window as any).__Tauri__.tauri;
      // const { invoke } = tauriApi.core;
    useEffect(() => {
      invoke('create')
        .then((response: any) => console.log(response))
        .catch((error: any) => console.log(error));
    
    }, []);

  
 
    return (
        <div>
            <Header/>
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs selectedTopic={selectedTopic} />
                </Row>
                <Row>
                    <Routes>
						            <Route path="/" element={<HomePage />} />
                        <Route path="/topics/" element={<TopicsPage topics={topics} setTopics={setTopics} isMock={isMock} setIsMock={setIsMock} topicName={topicName} setTopicName={setTopicName}/>} />
                        <Route path="/topics/:id" element={<TopicPage selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} isMock={isMock} setIsMock={setIsMock}/>} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App