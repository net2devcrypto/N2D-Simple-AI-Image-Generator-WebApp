import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/custom.css';
import 'sf-font'

export default function App({ Component, pageProps }) {
  return (
    <div>
  <Component {...pageProps} />
  </div>
  )
}