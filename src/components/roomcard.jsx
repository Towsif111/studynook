import Image from "next/image";
import Link from "next/link";

const RoomCard = ({ room }) => {
  const { _id, imageUrl, price, roomName, floor, category, capacity } = room;

  return (
    <div className="group overflow-hidden rounded-2xl border border-neutral-800/60 bg-neutral-900/60 shadow-xl shadow-black/20 backdrop-blur-sm transition hover:border-neutral-700">
      <Link href={`/rooms/${_id}`}>
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            alt={roomName}
            src={imageUrl}
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
        </div>
      </Link>

      <div className="space-y-3 p-4">
        <Link href={`/rooms/${_id}`}>
          <h2 className="truncate text-lg font-bold text-white transition hover:text-lime-200">
            {roomName}
          </h2>
        </Link>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-400">
          {floor && (
            <span className="flex items-center gap-1">
              <span aria-hidden="true">🏢</span>
              Floor {floor}
            </span>
          )}
          {category && (
            <span className="flex items-center gap-1">
              <span aria-hidden="true">📂</span>
              {category}
            </span>
          )}
          {capacity && (
            <span className="flex items-center gap-1">
              <span aria-hidden="true">👥</span>
              Up to {capacity}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-neutral-800/50 pt-3">
          <p className="text-sm text-neutral-400">
            <span className="text-2xl font-bold text-lime-200">{price}</span>
          </p>
          <Link
            href={`/rooms/${_id}`}
            className="rounded-xl border border-neutral-700/60 px-5 py-2 text-xs font-medium text-neutral-300 transition hover:border-lime-300/40 hover:text-lime-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;