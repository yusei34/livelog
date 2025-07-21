import Link from "next/link";
import { Guitar, Music } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/DetailCard";

const DetailEventActor = ({ event }) => {
  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/30 overflow-hidden">
      <CardHeader className="grid gap-4 p-4 pt-2">
        <div className="flex items-center gap-3 p-4  rounded-xl">
          <div className="p-2 bg-gradient-to-r from-orange-700 to-orange-500 rounded-lg text-white">
            <Music className="h-5 w-5" />
          </div>
          <CardTitle className="text-2xl font-semibold">
            出演アーティスト
          </CardTitle>
        </div>
        <CardContent className="grid grid-cols-1 gap-3 ">
          {event.actors.length === 0 ? (
            <p>アーティストの登録がありません</p>
          ) : (
            event.actors.map((actor) => (
              // <Link  key={artist.id} href={`/artists/${artist.id}`}>
              <div
                key={actor.id}
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-100 to-red-100 hover:from-orange-200 hover:to-red-200  transition-all duration-300 transform hover:scale-105 rounded-xl"
              >
                <div className="p-2 bg-orange-500 rounded-lg text-white">
                  <Guitar className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-xl pr-3">{actor.name}</CardTitle>
                </div>
              </div>
              // </Link>
            ))
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default DetailEventActor;
