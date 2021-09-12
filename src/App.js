import { Button } from '@material-ui/core';
import ProductFeature from 'features/Product';
import { useSnackbar } from 'notistack';
import { Route, Switch } from 'react-router';
import './App.css';
import Header from './components/Header'
function App() {
  const {enqueueSnackbar} = useSnackbar();
  function showNoti(){
    enqueueSnackbar('Register successfully', {variant:'success'});
  }
  return (
    <div className="App">
      <Header />
      <Button onClick={showNoti}>Show Noti</Button>
      <Switch>
        <Route path="/products" component={ProductFeature} />
      </Switch>
    </div>
  );
}

export default App;
