import Image from "next/image";
//import Login from './auth/login';
import Register from './auth/register/page';
import Verification from  './auth/verification/page';
export default function Home() {
  return (
    <div>
      
      {/* < Login /> */}
      < Register />
      {/* < Verification /> */}
      
    </div>
  );
}
