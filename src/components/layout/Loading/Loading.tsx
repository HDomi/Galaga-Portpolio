import "./Loading.scss";
import LoadingGif from "@assets/images/ind.gif";
import { isLoadingSelector } from "@recoil/atoms/loadingState";
import { useRecoilValue } from "recoil";
export const Loading = () => {
  const isLoading = useRecoilValue(isLoadingSelector);
  if (isLoading) {
    return (
      <div className="loading-wrap">
        <img src={LoadingGif} alt="load-img" />
      </div>
    );
  } else {
    return null;
  }
};
export default Loading;
