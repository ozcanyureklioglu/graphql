import { Row, Col, Divider } from "antd";
import style from "./styles.module.css";
import HeaderMenu from './HeaderMenu';
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link,
} from "react-router-dom";

//pages
import Home from "../../pages/Home/index";
import NewPost from "../../pages/NewPost/index";

function App() {
  return (
    <div className={style.container}>
      <Row justify="center">
        <Col span={14}>
          <HeaderMenu />
          <div className={style.content}>
            <Switch>
              <Route path="/newpost" component={NewPost} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
