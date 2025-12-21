"use client";

import NotiCard from "@/components/NotiCard";
import SmallHeading from "@/components/SmallHeading";
import useFetchAllNotifications from "@/hooks/useFetchAllNotifications";
import useFetchAnnouncementsByAuthorIds from "@/hooks/useFetchAnnouncementsByAuthorIds";
import useFetchChaptersByIds from "@/hooks/useFetchChaptersByIds";
import useFetchStoriesByIds from "@/hooks/useFetchStoriesByIds";
import useFetchStory from "@/hooks/useFetchStory";
import useFetchUsersByIds from "@/hooks/useFetchUsersByIds";
import { markNotificationAsViewed } from "@/lib/notification";

import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

const Page = () => {
  const { user } = useAuthStore();
  const router = useRouter();

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
  //console.log("actor id list: ", actorIds);

  const { announcements } = useFetchAnnouncementsByAuthorIds(actorIds);
  //console.log("announcements: ", announcements);

  const chapterIds = notifications
    .filter((noti) => noti.target_type === "chapter")
    .map((noti) => noti.target_id);

  const { chapters } = useFetchChaptersByIds(chapterIds);

  const storyIdsFromChapters = chapters.map((chap) => chap.story_id);

  const storyIdsFromNoti = notifications
    .filter((n) => n.target_type === "story")
    .map((n) => n.target_id);

  const storyIdsSet = new Set([...storyIdsFromChapters, ...storyIdsFromNoti]);
  const storyIds = Array.from(storyIdsSet);
  //console.log("story id list: ", storyIds);

  const { stories } = useFetchStoriesByIds(storyIds);
  //console.log("stories list: ", stories);

  const mergedActions = notifications?.map((noti) => {
    const actor = actors.find((a) => a.id === noti.actor_id) || {};

    let chapter,
      story,
      targetText = "";

    if (noti.target_type === "chapter") {
      chapter = chapters.find((c) => c.id === noti.target_id);
      story = stories.find((s) => s.id === chapter?.story_id);
      targetText = `${story?.title}: ${chapter?.title} `;
    }

    let content = "";
    if (noti.action_type === "followed") {
      content = `${actor.pen_name} started following you`;
    } else if (noti.action_type === "liked") {
      content = `${actor.pen_name} liked your story ${targetText}`;
    } else if (noti.action_type === "commented") {
      content = `${actor.pen_name} commented on your story ${targetText}`;
    } else if (noti.action_type === "announcement") {
      const announcement = announcements.find((a) => a.id === noti.target_id);
      content = announcement
        ? `${actor.pen_name} posed an announcement: ${announcement?.title}`
        : undefined;
    } else if (noti.action_type === "published_story") {
      story = stories.find((s) => s.id === noti.target_id);
      console.log("story info: ", story);
      content = story
        ? `${actor.pen_name} published a new story "${story?.title}"`
        : undefined;
    } else if (noti.action_type === "updated_chapter") {
      content = chapter
        ? `${actor.pen_name} published a new chapter: ${chapter?.title} in the story: ${story?.title}`
        : undefined;
    }

    return {
      ...noti,
      actor,
      chapter,
      story,
      content,
    };
  });

  const today = mergedActions.filter(
    (noti) =>
      new Date(noti.created_at).toDateString() === new Date().toDateString()
  );

  const thisWeek = mergedActions.filter((noti) => {
    const notiDate = new Date(noti.created_at);
    const now = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(now.getDate() - 7);
    return notiDate < new Date(now.toDateString()) && notiDate >= weekAgo;
  });

  const earlier = mergedActions.filter((noti) => {
    const notiDate = new Date(noti.created_at);
    const now = new Date();

    const weekAgo = new Date();
    weekAgo.setDate(now.getDate() - 7);

    return notiDate < weekAgo;
  });


  const handleClickNotiCard = async (noti) => {
    const { data } = await markNotificationAsViewed(noti.id);

    if (noti.target_type === "user") {
      router.push(`/author/${noti.actor?.user_name}`);
    } else if (noti.target_type === "announcement") {
      router.push(`/author/${noti.actor?.user_name}`);
    } else if (noti.target_type === "chapter") {
      router.push(`/p_stories/${noti.story?.id}/chapters/${noti.chapter?.id}`);
    } else if (noti.target_type === "story") {
      router.push(`/p_stories/${noti.target_id}`);
    }
  };

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
        {today.length > 0 ? (
          today.map((noti) => {
            if (!noti.content) return null;
            return (
              <NotiCard
                image={noti.actor?.profile_image_url || "/default-user.jpg"}
                content={noti.content}
                time={noti.created_at}
                key={noti.id}
                isViewed={noti.is_viewed}
                onClick={() => handleClickNotiCard(noti)}
              />
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="font-semibold text-2xl text-gray-700 dark:text-gray-300 mb-4">
              No Notification!
            </p>

            <img
              src="/no_noti.png"
              alt="No notification"
              className="w-40 h-40 object-contain opacity-80"
            />
          </div>
        )}
      </div>

      {/* Earlier */}
      <h2 className="font-bold text-lg sm:text-xl mt-8 mb-3 self-start lg:self-center w-full max-w-3xl">
        This Week
      </h2>

      <div className="flex flex-col gap-4 w-full max-w-3xl">
        {thisWeek.length > 0 ? (
          thisWeek.map((noti) => {
            if (!noti.content) return null;
            return (
              <NotiCard
                image={noti.actor?.profile_image_url || "/default-user.jpg"}
                content={noti.content}
                time={noti.created_at}
                key={noti.id}
                isViewed={noti.is_viewed}
                onClick={() => handleClickNotiCard(noti)}
              />
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="font-semibold text-2xl text-gray-700 dark:text-gray-300 mb-4">
              No Notification!
            </p>

            <img
              src="/no_noti.png"
              alt="No notification"
              className="w-40 h-40 object-contain opacity-80"
            />
          </div>
        )}
      </div>

      <h2 className="font-bold text-lg sm:text-xl mt-8 mb-3 self-start lg:self-center w-full max-w-3xl">
        Earlier
      </h2>

      <div className="flex flex-col gap-4 w-full max-w-3xl">
        {earlier.length > 0 ? (
          earlier.map((noti) => {
            if (!noti.content) return null;
            return (
              <NotiCard
                image={noti.actor?.profile_image_url || "/default-user.jpg"}
                content={noti.content}
                time={noti.created_at}
                key={noti.id}
                isViewed={noti.is_viewed}
                onClick={() => handleClickNotiCard(noti)}
              />
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="font-semibold text-2xl text-gray-700 dark:text-gray-300 mb-4">
              No Notification!
            </p>

            <img
              src="/no_noti.png"
              alt="No notification"
              className="w-40 h-40 object-contain opacity-80"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
