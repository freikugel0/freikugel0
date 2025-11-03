import { createFileRoute } from "@tanstack/react-router";
import Desktop from "../components/desktop";
import DesktopIcon from "../components/desktop_icon";
import Taskbar from "../components/taskbar";
import Menu from "../components/windows/menu";
import { registeredApps } from "../constant/registered_apps";
import useAppStore from "../stores/app.store";
import { useState } from "react";
import Bootstrapper from "../components/bootstrapper";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { start_menu, setStartMenu } = useAppStore();
  const [booted, setBooted] = useState(false);

  return booted ? (
    <div className="w-full">
      <Desktop
        onClick={() => setStartMenu(false)}
        icons={[
          <DesktopIcon
            key={registeredApps.projects.id}
            icon={registeredApps.about.icon}
            label={registeredApps.about.name}
            appid="about"
            pos_x={30}
            pos_y={30}
          />,
          <DesktopIcon
            key={registeredApps.projects.id}
            icon={registeredApps.projects.icon}
            label={registeredApps.projects.name}
            appid="projects"
            pos_x={30}
            pos_y={120}
          />,
        ]}
      />
      <Taskbar />
      {start_menu && <Menu />}
      {Object.entries(registeredApps).map(([appid, app]) => {
        return <app.windowComponent key={appid} />;
      })}
    </div>
  ) : (
    <Bootstrapper onFinish={() => setBooted(true)} />
  );
}
