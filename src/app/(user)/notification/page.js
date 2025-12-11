"use client";

import NotiCard from "@/components/NotiCard";
import SmallHeading from "@/components/SmallHeading";
import useFetchAllNotifications from "@/hooks/useFetchAllNotifications";
import useFetchChaptersByIds from "@/hooks/useFetchChaptersByIds";
import useFetchStoriesByIds from "@/hooks/useFetchStoriesByIds";
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

  const chapterIds = notifications
    .filter((noti) => noti.target_type === "chapter")
    .map((noti) => noti.target_id);

  const { chapters } = useFetchChaptersByIds(chapterIds);

  const storyIds = chapters.map((chap) => chap.story_id);

  const { stories } = useFetchStoriesByIds(storyIds);

  const mergedActions = notifications?.map((noti) => {
    const actor = actors.find((a) => a.id === noti.actor_id) || {};

    let targetText = "";

    if (noti.target_type === "chapter") {
      const chapter = chapters.find((c) => c.id === noti.target_id);
      const story = stories.find((s) => s.id === chapter?.story_id);
      targetText = `${story?.title}: ${chapter?.title} `;
    }

    let content = "";
    if (noti.action_type === "followed") {
      content = `${actor.pen_name} started following you`;
    } else if (noti.action_type === "liked") {
      content = `${actor.pen_name} liked your story ${targetText}`;
    } else if (noti.action_type === "commented") {
      content = `${actor.pen_name} commented on your story ${targetText}`;
    }

    return {
      ...noti,
      actor,
      content,
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
        {mergedActions?.map((noti) => (
          <NotiCard
            image={noti.actor?.profile_image_url || "/default-user.png"}
            content={noti.content}
            time={noti.created_at}
            key={noti.id}
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
