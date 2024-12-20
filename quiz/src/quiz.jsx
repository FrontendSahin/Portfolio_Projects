import React, { useState } from 'react';
import './css/quiz.css';

function Quiz() {
    const tags = ["Soru 1)", "Soru 2)", "Soru 3)", "Soru 4)", "Soru 5)", "Soru 6)", "Soru 7)", "Soru 8)", "Soru 9)", "Soru 10)"];
    const sorular = [
        "Türk bayrağındaki ay ve yıldızın hangi mitolojik figürle ilişkili olduğu kabul edilir?",
        "Dünyanın en büyük okyanusu hangisidir?",
        "Birleşmiş Milletler'in merkezi hangi şehirde yer almaktadır?",
        "Türkiye Cumhuriyeti'nin ilk Cumhurbaşkanı kimdir?",
        "Hangi gezegen Güneş Sistemi'ndeki en büyük gezegendir?",
        "1957'de Sputnik 1'in uzaya gönderilmesi hangi ülke tarafından gerçekleştirilmiştir?",
        "Büyükçekmece Gölü Türkiye'nin hangi ilinde yer almaktadır?",
        "Hangisi ünlü İngiliz yazar William Shakespeare'in eserlerinden birisidir?",
        "Hangi organ vücudun en büyük organıdır?",
        "Türkiye'nin en yüksek dağı hangisidir?"
    ];
    const cevaplar = [
        "Ay Tanrıçası Selene",
        "Pasifik Okyanusu",
        "New York",
        "Mustafa Kemal Atatürk",
        "Jüpiter",
        "Sovyetler Birliği",
        "İstanbul",
        "Hamlet",
        "Cilt",
        "Ağrı Dağı"
    ];
    const şıklar = [
        ["Ay Tanrıçası Selene", "Zeytin Tanrıçası Athena", "Kader Tanrısı Moira", "Aşk Tanrıçası Afrodit"],
        ["Pasifik Okyanusu", "Atlantik Okyanusu", "Hint Okyanusu", "Arktik Okyanusu"],
        ["New York", "Paris", "Viyana", "Cenevre"],
        ["Mustafa Kemal Atatürk", "İsmet İnönü", "Recep Tayyip Erdoğan", "Mehmet Akif Ersoy"],
        ["Jüpiter", "Satürn", "Mars", "Venüs"],
        ["Sovyetler Birliği", "Amerika Birleşik Devletleri", "Çin", "Fransa"],
        ["İstanbul", "Antalya", "İzmir", "Bursa"],
        ["Hamlet", "Romeo ve Juliet", "Macbeth", "Otello"],
        ["Cilt", "Beyin", "Karaciğer", "Mide"],
        ["Ağrı Dağı", "Erciyes Dağı", "Kaçkar Dağı", "Göller Yüksekliği"]
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [answerStates, setAnswerStates] = useState(Array(tags.length).fill(null)); // To track answer states

    const handleAnswerClick = (selectedOption) => {
        if (quizFinished) return;

        const newAnswerStates = [...answerStates];
        if (newAnswerStates[currentQuestionIndex]) return; // If an answer is already selected, do nothing

        const isCorrect = selectedOption === cevaplar[currentQuestionIndex];
        newAnswerStates[currentQuestionIndex] = {
            isCorrect,
            selectedOption
        };

        setAnswerStates(newAnswerStates);
        if (isCorrect) {
            setCorrectAnswers(correctAnswers + 1);
        } else {
            setIncorrectAnswers(incorrectAnswers + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < tags.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
        } else {
            setQuizFinished(true);
        }
    };

    const handleBackQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedOption(null);
        }
    };

    const handleFinishQuiz = () => {
        setQuizFinished(true);
    };

    return (
        <div className="Body">
            <div className="cardBody1">
                {!quizFinished ? (
                    <>
                        <div className="Header">
                            <div className="Head">
                                <span className="Tag">{tags[currentQuestionIndex]}</span>
                            </div>
                            <div className="quest">
                                <span>{sorular[currentQuestionIndex]}</span>
                            </div>
                        </div>
                        <hr className="siyah-hr" />
                        <div className="questionBody">
                            {şıklar[currentQuestionIndex].map((option, index) => {
                                const answerState = answerStates[currentQuestionIndex];
                                const isSelected = answerState && answerState.selectedOption === option;
                                const isCorrect = answerState && answerState.isCorrect && answerState.selectedOption === option;
                                const isWrong = answerState && !answerState.isCorrect && answerState.selectedOption === option;
                                const backgroundColor = isCorrect ? 'green' : isWrong ? 'red' : '';

                                return (
                                    <div
                                        key={index}
                                        className={`Question ${isSelected ? 'selected' : ''}`}
                                        style={{ backgroundColor }}
                                        onClick={() => handleAnswerClick(option)}
                                    >
                                        <span>{`${String.fromCharCode(65 + index)})`}</span><p>{option}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="NavigationButtons">
                            <button
                                className="GeriButon"
                                onClick={handleBackQuestion}
                                disabled={currentQuestionIndex === 0}
                            >
                                Geri
                            </button>
                            <button className="İleriButon" onClick={handleNextQuestion}>
                                {currentQuestionIndex === tags.length - 1 ? "Yarışmayı Bitir" : "Sonraki Soru"}
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="Result">
                        <h2>Yarışma Sonuçları</h2>
                        <p>Doğru: {correctAnswers}</p>
                        <p>Yanlış: {incorrectAnswers}</p>
                        <button
                            className="FinishButton"
                            onClick={() => {
                                setCorrectAnswers(0);
                                setIncorrectAnswers(0);
                                setCurrentQuestionIndex(0);
                                setQuizFinished(false);
                                setAnswerStates(Array(tags.length).fill(null)); // Reset answer states
                            }}
                        >
                            Tekrar Başla
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Quiz;
