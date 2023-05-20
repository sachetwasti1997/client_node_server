
import axios from 'axios';
import { headers } from 'next/headers';

const getCurrentUser = async () => {
  const nxtcks = headers();
  const cookie = nxtcks.entries();

  
  const hders = {}
  for (const p of cookie) {
    hders[p[0]] = p[1]
  }
  console.log('Cookie', {...hders});
  // url - 'http://SERVICENAME.NAMESPACE.svc.cluster.local'
  try{
    console.log(
      "Requesting 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',"
    );
  const response = await axios.get(
    'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
    {
      headers: {
        ...hders,
      },
    }
  );
  return response.data;
  }catch (err) {
    console.log(err?.response?.data);
  }

};

export default async function Home() {
  const data = await getCurrentUser()
  console.log("Data Received",data);
  return (
    data ? <h1>You are signed in!</h1> : <h1>You are not signed in!</h1>
  )
}
