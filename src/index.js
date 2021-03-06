import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import createRoutes from './route';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const routes = createRoutes();

// window.onbeforeunload = function() {
//   localStorage.clear();
//   return '';
// };

ReactDOM.render(
  routes,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
