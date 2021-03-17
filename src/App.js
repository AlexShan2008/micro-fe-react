import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Divider } from "antd";
import { GlobalStyle } from "super-design";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

import "antd/dist/antd.min.css";
import "./App.css";

import LibVersion from "./components/LibVersion";
import HelloModal from "./components/HelloModal";

import Home from "./pages/Home";

import { getUser, postUser } from "./services/user";

const About = lazy(() => import("./pages/About"));

// Create a client
const queryClient = new QueryClient();

const RouteExample = (props) => {
  return (
    // basename 必须与基座 base 保持一致 TODO: 可以封装一个组件来统一解决这个问题
    <Router basename={window.__POWERED_BY_QIANKUN__ ? "/react" : "/"}>
      <nav>
        <Link to="/">Home</Link>
        <Divider type="vertical" />
        <Link to="/about">About</Link>
      </nav>
      <Suspense fallback={null}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export const ReactQueryDemo = () => {
  const queryClient = useQueryClient();

  // Queries
  // const {
  //   isIdle,
  //   isLoading,
  //   data,
  //   isError,
  //   error,
  //   refetch,
  //   isFetching,
  // }
  const { isLoading, data } = useQuery("user", getUser);

  // Mutations
  const mutation = useMutation(postUser, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("user");
    },
  });

  return (
    <div>
      <div>{isLoading ? "Loading..." : ""}</div>
      <ul>
        {data.length > 0 &&
          data.map((todo) => <li key={todo.id}>{todo.title}</li>)}
      </ul>

      <button
        onClick={() => {
          mutation.mutate({
            id: Date.now(),
            title: "Do Laundry",
          });
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

export default function App(props) {
  // const { BASE_STORE } = props.data
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-main">
        <GlobalStyle />

        {/* <Badge /> */}
        {/* <Avatar /> */}
        <li>111</li>
        {/* <Button>Super Design</Button> */}

        <LibVersion />
        <HelloModal />
        <Divider />
        <RouteExample />

        <ReactQueryDemo />

        <div>
          {/* <h3>Data from Parent App: <i>{BASE_STORE.title}</i></h3> */}
        </div>
      </div>
    </QueryClientProvider>
  );
}
