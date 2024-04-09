// import useSWR from "swr";

import { App } from "../../components/main";
import { routerMeta } from "../../mocks/routerMeta";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Index() {
  // 请求数据
  // const { data, error, isLoading } = useSWR("/api/hello", fetcher);

  // if (error) return <div>Failed to load</div>;
  // if (isLoading) return <div>Loading...</div>;
  // if (!data) return null;

  return (
    <div>
      <App routerMeta={routerMeta} />
    </div>
  );
}
