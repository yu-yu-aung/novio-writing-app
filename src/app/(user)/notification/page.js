"use client";

import NotiCard from "@/components/NotiCard";
import SmallHeading from "@/components/SmallHeading";
import useFetchAllNotifications from "@/hooks/useFetchAllNotifications";
import useFetchUsersByIds from "@/hooks/useFetchUsersByIds";

import useAuthStore from "@/store/useAuthStore";

const Page = () => {
  const { user } = useAuthStore();
  const {
    notifications,
    loading: loadingNoti,
    error: errorNoti,
  } = useFetchAllNotifications(user);

  const actorIds = notifications.map((item) => item.actor_id) || [];
  const {
    users: actors,
    error: errorActor,
    loading: loadingActor,
  } = useFetchUsersByIds(actorIds);

  const mergedActions = notifications?.map((noti) => {
    const actorInfo = actors?.find((actor) => actor.id === noti.actor_id);
    return {
      ...noti,
      actor: actorInfo || {},
    };
  });

  if (!user) return;

  console.log("Noti : ", notifications);
  console.log("merged noti: ", mergedActions);

  return (
    <div className="px-4 sm:px-8 lg:px-24 flex flex-col items-center pb-10">
      <SmallHeading title="Notification" />

      {/* Today */}
      <h2 className="font-bold text-lg sm:text-xl mt-4 mb-3 self-start lg:self-center w-full max-w-3xl">
        Today
      </h2>

      <div className="flex flex-col gap-4 w-full max-w-3xl">
        {mergedActions?.map((noti, index) => (
          <NotiCard
            image={noti.actor?.profile_image_url || "/default-user.png"}
            content={`${noti.actor?.pen_name} ${noti.action_type}`}
            time={noti.created_at}
            key={index}
          />
        ))}
      </div>

      {/* This Week */}
      <h2 className="font-bold text-lg sm:text-xl mt-8 mb-3 self-start lg:self-center w-full max-w-3xl">
        This Week
      </h2>

      <div className="flex flex-col gap-4 w-full max-w-3xl">
        <NotiCard />
        <NotiCard />
        <NotiCard />
      </div>
    </div>
  );
};

export default Page;
