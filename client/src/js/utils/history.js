import { createBrowserHistory } from "history";
const history = createBrowserHistory();

export const push = (path) => history.push(path);
export default history;
