import "./MainTypingText.scss";
import { useEffect, useState, useRef } from "react";

export const MainTypingText = () => {
  const [helloText, setHelloText] = useState<string>("");
  const currentIndex = useRef(0);
  const welcomeText: string = "안녕하세요. 황재영입니다...";
  const welcomeText2: string = "제 포트폴리오에 오신 것을 환영합니다..!";
  const totalText = `${welcomeText}${welcomeText2}`;

  const [isFirstFin, setIsFirstFin] = useState<boolean>(false);
  const isFin = localStorage.getItem("FIRST_LOAD_FIN") === "FIN";
  const [allFin, setAllFin] = useState<boolean>(false);
  const skipIntro = () => {
    setAllFin(true);
    setTimeout(() => {
      localStorage.setItem("FIRST_LOAD_FIN", "FIN");
    }, 500);
  };

  useEffect(() => {
    if (isFin || allFin) return;
    const timerId = setInterval(() => {
      if (totalText.length > currentIndex.current) {
        setHelloText((state) => {
          const newState = (state += totalText[currentIndex.current]);
          currentIndex.current += 1;
          if (newState === welcomeText) {
            clearInterval(timerId);
            setIsFirstFin(true);
            setTimeout(() => {
              currentIndex.current = 0;
              setHelloText("");
              const timerId2 = setInterval(() => {
                if (welcomeText2.length > currentIndex.current) {
                  setHelloText((state2) => {
                    const newState2 = (state2 +=
                      welcomeText2[currentIndex.current]);
                    currentIndex.current += 1;
                    if (newState2 === totalText) {
                      clearInterval(timerId2);
                    }
                    return newState2;
                  });
                }
              }, 250);
            }, 1000);
          }
          return newState;
        });
      }
    }, 250);

    return () => clearInterval(timerId);
    // eslint-disable-next-line
  }, [totalText, welcomeText, welcomeText2]);

  useEffect(() => {
    if (helloText === welcomeText2) {
      setTimeout(() => {
        setAllFin(true);
        localStorage.setItem("FIRST_LOAD_FIN", "FIN");
      }, 2000);
    }
  }, [helloText, welcomeText2]);

  if (allFin || isFin) return null;
  return (
    <div className="typing-wrap flex-col">
      <div
        className={`typing-text ${helloText === totalText ? "fin-type" : ""}`}
      >
        {helloText}
      </div>
      {isFirstFin && (
        <button className="btn skip-btn" onClick={() => skipIntro()}>
          SKIP
        </button>
      )}
    </div>
  );
};

export default MainTypingText;
