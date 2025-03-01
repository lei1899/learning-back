'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import AudioPlayer from "../components/content/audioPlayer";
import FillInTheBlankComponent from "../components/content/fillInTheBlankComponent";
import ComparisonComponent, { getComparisonText, getBoldText } from "../components/content/comparisonComponent";
import QuizComponent  from "../components/content/quizComponent";
import { TitleSection, FlexRowCenter } from "./style";
import { Container, FlexColumnCenter, ListenImage } from "../style/Container";

function ListenFillAnswerPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [data, setData] = useState(null);
    const [showComparison, setShowComparison] = useState(false);
    const [showChoices, setShowChoices] = useState(false); 
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [inputValues, setInputValues] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`/api/contentListenFill?id=${id}`, {
                    cache: 'no-store',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                if (data.length > 0) {
                    setData(data[0]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        if (id) {
            fetchData();
        }
    }, [id]);

    if (!data) {
        return <></>;
    }

    const handleSubmit = () => {
        handleSubmitAndSendEmail(null, getComparisonText({ blankString:blanks, inputValues }), 'template_listen_submit');
        setShowComparison(true);
    };

    const handleConfirmComparison = () => {
        setShowChoices(true);
    };

    const imageUrl = data?.image_url;
    const audioUrl = data?.audio_url;
    console.log("imageUrl", audioUrl);

    return (
        <Container>
            <TitleSection>
                <h4>{data.title}</h4>
            </TitleSection>
            {imageUrl && (
                <div>
                    <ListenImage alt="" src={`${imageUrl}`} />
                </div>
            )}
            <FlexColumnCenter>
                <FlexRowCenter>
                    <button onClick={() => setShowChoices(true)}>Skip Dictation</button>
                    <button onClick={() => setShowChoices(false)}>Back to Dictation</button>
                </FlexRowCenter>
                <AudioPlayer src={audioUrl}></AudioPlayer>
            </FlexColumnCenter>
        </Container>
    );
}

export default ListenFillAnswerPage;