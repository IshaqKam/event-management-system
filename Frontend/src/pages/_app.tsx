import 'styles/global.css';

import store from 'redux/store';
import useToast from 'hooks/useToast';
import { Provider } from 'react-redux';
import { AppPropsWithLayout } from 'interfaces/pages';

function App({ Component, pageProps }: AppPropsWithLayout) {
  const { Toast, handleClick } = useToast();
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <Provider store={store}>
      {getLayout(<Component {...pageProps} showToast={handleClick} />)}
      <Toast />
    </Provider>
  );
}

export default App;
