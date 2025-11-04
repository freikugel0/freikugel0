import { BatteryFullIcon, SignalHighIcon, WifiHighIcon } from "lucide-react";
import CurrentTime from "../current_time";

const StatusBar = ({ ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className="z-index[9999] absolute top-0 left-0 z-50 flex h-full max-h-6 w-full items-center justify-between border-b border-b-slate-300 bg-slate-500 px-4 py-1 text-gray-300"
      {...props}
    >
      <div className="text-xs">
        <CurrentTime />
      </div>
      <div className="flex items-center gap-2">
        <SignalHighIcon size={14} />
        <WifiHighIcon size={14} />
        <BatteryFullIcon size={14} />
      </div>
    </div>
  );
};

export default StatusBar;
