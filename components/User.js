import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const kFormatter = (number) => {
  return Intl.NumberFormat("en", { notation: "compact" }).format(number);
};

function User({ username }) {
  const { data } = useSWR(`/api/user?username=${username}`, fetcher);

  return (
    <div className=" flex flex-col font-mono">
      <div className="w-[500px] h-[500px]  relative grid self-center rounded-full">
        <div className="w-[400px] h-[400px] bg-green-500 place-self-center rounded-full relative">
          <Image
            src={
              data?.user.avatarUrl ||
              "https://avatars.githubusercontent.com/u/72314836?v=4"
            }
            layout="fill"
            alt="avatar"
            className="rounded-full"
          />
        </div>
        <div className="w-full flex  absolute bottom-2 col-auto items-end justify-center space-x-8">
          {data?.user.repositories.nodes.map((repo) => (
            <Link href={repo.url} replace key={repo.url}>
              <a className="w-16 h-16 bg-gray-600 rounded-full text-center items-center cursor-pointer justify-center flex flex-col text-white font-bold text-lg">
                {kFormatter(repo.stargazerCount) || "0"} <span>⭐️</span>
              </a>
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-5 grid justify-items-center">
        <h4 className="font-bold text-5xl">
          @{data?.user.username || "username"}
        </h4>
        <h3 className="font-bold text-7xl">{data?.user.name || "N/A"}</h3>
        <h5 className="font-semibold text-lg text-center text-gray-700">
          {data?.user.bio || "N/A"}
        </h5>

        <div className="bg-gray-700 text-center py-4 justify-center items-center space-x-16 w-full text-white uppercase text-4xl flex">
          <div>
            <h5>Repos</h5>
            <p>{kFormatter(data?.user.repositories.totalCount) || "0"}</p>
          </div>

          <div>
            <h5>Followers</h5>
            <p>{kFormatter(data?.user.followers.totalCount) || "0"}</p>
          </div>

          <div>
            <h5>Following</h5>
            <p>{kFormatter(data?.user.following.totalCount) || "0"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
