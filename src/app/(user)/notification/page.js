import NotiCard from "@/components/NotiCard";
import SmallHeading from "@/components/SmallHeading";

const Page = () => {
  return (
    <div className="px-4 sm:px-8 lg:px-24 flex flex-col items-center pb-10">
      <SmallHeading title="Notification" />

      {/* Today */}
      <h2 className="font-bold text-lg sm:text-xl mt-4 mb-3 self-start lg:self-center w-full max-w-3xl">
        Today
      </h2>

      <div className="flex flex-col gap-4 w-full max-w-3xl">
        <NotiCard />
        <NotiCard />
        <NotiCard />
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
