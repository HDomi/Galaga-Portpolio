import "./Main.scss";
import { useEffect, useState, useRef } from "react";
import { useSetRecoilState } from "recoil";
import MakeToast from "@hooks/MakeToast";
import { isLoadingState } from "@recoil/atoms/loadingState";
import MainTypingText from "@components/mainTyping/MainTypingText";
import ImgGalaga from "@assets/images/galaga.png";
import ImgGalagaEnemy from "@assets/images/galaga_enemy.png";
import { useRouter } from "@hooks/useRouter";

function Main() {
  const router = useRouter();
  const setLoading = useSetRecoilState(isLoadingState);
  const [mainScore, setMainScore] = useState(() => {
    const storedScore = localStorage.getItem("MAIN_SCORE");
    return storedScore ? storedScore : "000000";
  });

  const galagaRef = useRef<HTMLImageElement>(null);
  const bulletRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = () => {
      setMainScore((prevScore) => {
        const incrementedScore = parseInt(prevScore) + 1;
        const newScore = incrementedScore.toString().padStart(6, "0");
        localStorage.setItem("MAIN_SCORE", newScore);
        return newScore;
      });

      if (bulletRef.current && galagaRef.current) {
        const bullet = bulletRef.current;
        const galaga = galagaRef.current;
        const categoryItems = document.querySelectorAll(".category-item");
        bullet.style.display = "block";
        bullet.style.left = `${galaga.offsetLeft + galaga.offsetWidth / 2}px`;
        bullet.style.top = `${galaga.offsetTop}px`;
        const bulletInterval = setInterval(() => {
          bullet.style.top = `${bullet.offsetTop - 10}px`;
          for (let i = 0; i < categoryItems.length; i++) {
            const categoryItem = categoryItems[i] as HTMLElement;
            const rect = categoryItem.getBoundingClientRect();

            if (
              bullet.offsetTop <= rect.bottom - 40 &&
              bullet.offsetLeft >= rect.left - 50 &&
              bullet.offsetLeft <= rect.right - 50
            ) {
              bullet.style.display = "none";
              clearInterval(bulletInterval);
              const className =
                categoryItem.classList[categoryItem.classList.length - 1];
              movePage(className);
              break;
            }
          }
          if (bullet.offsetTop < 0) {
            bullet.style.display = "none";
            clearInterval(bulletInterval);
          }
        }, 10);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (galagaRef.current) {
        const galaga = galagaRef.current;
        galaga.style.left = `${event.clientX - 40}px`;
        galaga.style.top = `${event.clientY - 40}px`;
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const movePage = (type: string) => {
    MakeToast("페이지 이동", type);
    router.push(`/${type}`);
  };

  return (
    <div className="page-main">
      {MainTypingText()}
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div className="main-header flex-row">
        <p className="up-text">1UP</p>
        <p className="score-text">{mainScore}</p>
      </div>
      <div className="page-wrap">
        <div className="category-wrap flex-row">
          <div className="category-item introduce">
            <p>소개</p>
            <img src={ImgGalagaEnemy} alt="" />
          </div>
          <div className="category-item skills">
            <p>스킬</p>
            <img src={ImgGalagaEnemy} alt="" />
          </div>
          <div className="category-item portpolio">
            <p>포트폴리오</p>
            <img src={ImgGalagaEnemy} alt="" />
          </div>
          <div className="category-item not-yet">
            <p>미정</p>
            <img src={ImgGalagaEnemy} alt="" />
          </div>
        </div>
        <img
          ref={galagaRef}
          src={ImgGalaga}
          alt="galaga"
          className="galaga-image"
        />
        <div className="galaga-bullet" ref={bulletRef}></div>
      </div>
    </div>
  );
}

export default Main;
