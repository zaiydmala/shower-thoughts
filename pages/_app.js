import '@/styles/globals.css'
import Layout from '../components/layout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App({ Component, pageProps }) {
  return (
    <Layout>
      <ToastContainer />
    <Component {...pageProps} />
    </Layout>
  );
}
export default App