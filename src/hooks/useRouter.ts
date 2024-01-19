import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

/**
 * back : 뒤로 가기 기능 (이전 페이지로 이동)
 * forward : 앞으로 가기 기능 (다음 페이지로 이동)
 * reload : 현재 페이지를 새로고침
 * push : 지정된 URL로 페이지를 이동(이동한 페이지는 기록 추가 O, 브라우저의 뒤로 가기 시 이전 페이지)
 * replace : 지정된 URL로 페이지를 이동(이동한 페이지는 기록 추가 X, 브라우저의 뒤로 가기 시 이전 페이지)
 */

export function useRouter() {
  const navigate = useNavigate();

  const router = useMemo(
    () => ({
      back: () => navigate(-1),
      forward: () => navigate(1),
      reload: () => window.location.reload(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      push: (href: string, state?: any) => navigate(href, { state: state }),
      replace: (href: string) => navigate(href, { replace: true }),
    }),
    [navigate]
  );

  return router;
}
