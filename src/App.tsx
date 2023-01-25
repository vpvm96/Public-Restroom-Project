
import Router from './routes/Router';

declare global {
  interface Window {
    kakao: any;
  }
}


function App() {
  return (

      <Router />

    </>
  );
}

export default App;
