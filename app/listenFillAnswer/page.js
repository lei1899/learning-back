'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AudioPlayer from "../components/content/audioPlayer";
import FillInTheBlankComponent from "../components/content/fillInTheBlankComponent";
import ComparisonComponent, { getBoldText } from "../components/content/comparisonComponent";
import QuizComponent from "../components/content/quizComponent";
import { TitleSection, FlexRowCenter, BlanksContainer } from "./style";
import { Container, FlexColumnCenter, ListenImage } from "../style/Container";

function SearchParamsComponent({ setId, setTitle }) {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const title = searchParams.get('title');

    useEffect(() => {
        setId(id);
        setTitle(title);
    }, [id, title, setId, setTitle]);

    return null;
}

function ListenFillAnswerPage() {
    const [id, setId] = useState(null);
    const [title, setTitle] = useState(null);
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
            console.log('fetchData', id);
            fetchData();
        }
    }, [id]);

    if (!data) {
        return (
            <Suspense fallback={<div>Loading search parameters...</div>}>
                <SearchParamsComponent setId={setId} setTitle={setTitle} />
            </Suspense>
        );
    }

    const handleSubmit = () => {
        // handleSubmitAndSendEmail(null, getComparisonText({ blankString:blanks, inputValues }), 'template_listen_submit');
        setShowComparison(true);
    };

    const handleConfirmComparison = () => {
        setShowChoices(true);
    };

    const imageUrl = data?.image_url;
    const audioUrl = data?.audio_url;
    const blanks = data?.blanks;
    const quiz = data?.quiz;

    return (
        <>
            {data && (
                <Container>
                    <TitleSection>
                        <h4>{title}</h4>
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
                <BlanksContainer>
                    {!showComparison && !showChoices && (
                        <FillInTheBlankComponent
                            blankString={blanks}
                            handleSubmit={handleSubmit}
                            inputValues={inputValues}
                            setInputValues={setInputValues} />
                    )}
                    {showComparison && !showChoices && (
                        <ComparisonComponent
                            blankString={blanks}
                            inputValues={inputValues}
                            handleConfirmComparison={handleConfirmComparison} />
                    )}
                    {showChoices && (
                        <>
                            {quiz && !quizCompleted && (
                                <div>
                                    {getBoldText({ blankString: blanks })}
                                    <QuizComponent
                                        questions={quiz}
                                        onQuizComplete={() => setQuizCompleted(true)} />
                                </div>
                            )}
                            {(!quiz || quizCompleted) && (
                                <div>
                                    {getBoldText({ blankString: blanks })}
                                    <h2>Congratulations!</h2>
                                </div>
                            )}
                        </>
                    )}
                    </BlanksContainer>
                </Container>
            )}
        </>
    );
}

export default ListenFillAnswerPage;