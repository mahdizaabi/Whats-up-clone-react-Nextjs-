import Head from "next/head";
import Sidebar from "../components/Sidebar";
import ChatScreen from "../components/ChatScreen";

export default function Home() {
  return (
    <div>
      <Head>
        <title>whats'ip</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className="Home__container">
      <Sidebar></Sidebar>
      <ChatScreen></ChatScreen>
      </div>
    </div>
  );
}
