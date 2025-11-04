import { ChevronLeftIcon, HomeIcon, LayoutGridIcon } from "lucide-react";

const NavigationBar = ({ ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className="z-index[9999] absolute bottom-0 left-0 z-50 flex h-full max-h-10 w-full items-center justify-between border-t border-t-slate-300 bg-slate-500 px-8 py-1 text-gray-300"
      {...props}
    >
      <ChevronLeftIcon className="fill-white" />
      <HomeIcon className="fill-white" />
      <LayoutGridIcon className="fill-white" />
    </div>
  );
};

export default NavigationBar;
