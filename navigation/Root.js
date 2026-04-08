import { Provider } from "react-redux";
import store from "../Redux/store";
import Tabs from "./Tabs";

export default function Root() {
    return ( 
      <Provider store={store}>
        <Tabs />
      </Provider>
    );
}
