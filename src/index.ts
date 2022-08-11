import { createAddon, runCli } from "@mediahubmx/sdk";
import { getDashboards } from "./ard.service";
import { directoryHandler, itemHandler } from "./handlers";

const main = async () => {
  const ardMediathekAddon = createAddon({
    id: "ard-mediathek",
    name: "ARD Mediathek",
    icon: "https://api.faviconkit.com/ardmediathek.de/144",
    version: "1.0.0",
    itemTypes: ["movie", "series", "directory"],
    catalogs: [
      {
        features: {
          search: { enabled: true },
        },
        options: {
          shape: "landscape",
          displayName: true,
        },
      },
    ],
    dashboards: await getDashboards(),
  });

  ardMediathekAddon.registerActionHandler("catalog", directoryHandler);
  ardMediathekAddon.registerActionHandler("item", itemHandler);

  runCli([ardMediathekAddon], { singleMode: true });
};

main();
