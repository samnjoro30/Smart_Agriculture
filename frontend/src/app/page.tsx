import Homepage from './page/page';
import Login from './auth/login/page';
export default function Home() {
  return (
    <div>
      <Login />
    </div>
  );
}

//FIREBASE_CLI_EXPERIMENTS=webframeworks firebase deploy