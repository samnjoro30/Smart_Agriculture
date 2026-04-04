import Login from './auth/login/page';
import Homepage from './page/page';

export default function Home() {
  return (
    <div>
      {/* <Login /> */}
      <Homepage />
    </div>
  );
}

//FIREBASE_CLI_EXPERIMENTS=webframeworks firebase deploy
