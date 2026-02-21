import { useQuery } from "@tanstack/react-query";
import { MessageCircleIcon, UsersIcon } from "lucide-react";
import { getUserFriends } from "../lib/api";
import { Link } from "react-router";

const FriendsPage = () => {
  const { data: friends, isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-full space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-2">
          <UsersIcon className="h-6 w-6 text-primary" />
          My Friends
        </h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : friends?.length === 0 ? (
          <div className="text-center py-12 opacity-70">
            <p>No friends found 😔</p>
          </div>
        ) : (
          <div className="grid gap-4 w-full sm:grid-cols-2">
            {friends?.map((friend) => (
              <div
                key={friend._id}
                className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="card-body p-4">
                  <div className="flex items-center gap-4">
                    <div className="avatar w-14 h-14 rounded-full bg-base-300">
                      <img
                        src={friend.profilePic}
                        alt={friend.fullName}
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {friend.fullName}
                      </h3>

                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="badge badge-secondary badge-sm">
                          Native: {friend.nativeLanguage}
                        </span>
                        <span className="badge badge-outline badge-sm">
                          Learning: {friend.learningLanguage}
                        </span>
                      </div>
                    </div>


                    <Link to={`/chat/${friend._id}`} >
                      <button className="btn  btn-outline w-full">
                        <MessageCircleIcon className="h-4 w-4 mr-1" />
                        Message
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;