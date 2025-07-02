import React from "react";
import Link from "next/link";

const SearchResultItems = ({ event }) => {
  return (
    <div className="px-6 py-3 hover:bg-green-50 cursor-pointer transition flex items-center gap-3">
      <Link href={`/events/${event.id}`} key={event.id}>
        <span className="font-medium text-gray-900">{event.title}</span>
      </Link>
    </div>
  );
};

export default SearchResultItems;
