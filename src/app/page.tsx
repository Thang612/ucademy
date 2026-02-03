import connectionToDatabase from "@/lib/mongoose";

export default async function Home() {
  const connect = connectionToDatabase()
  console.log({ connect })
  return <div>Homepage</div>;
}
