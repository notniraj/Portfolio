
import { FloatingDock } from "@/components/ui/FloatingDock";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconHome,
  IconMusic,
  IconTerminal2,
} from "@tabler/icons-react";

export function Dock() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-50 dark:text-neutral-800" />
      ),
      href: "#",
    },

    {
      title: "Projects",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-50 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Music",
      icon: (
        <IconMusic className="h-full w-full text-neutral-50 dark:text-neutral-300" />
      ),
      href: "https://open.spotify.com/artist/226pNqLGRCEBwkLkUltvN4?si=eVMGae6SRb6yWXK_pbd3tA",
    },
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-50 dark:text-neutral-300" />
      ),
      href: "https://www.linkedin.com/in/nirajkarkithapa/",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-50 dark:text-neutral-300" />
      ),
      href: "https://github.com/notniraj",
    },
  ];
  return (
    <div className=" fixed bottom-1 flex items-center justify-end md:justify-center w-full z-50 ">
      <FloatingDock
        items={links}
      />
    </div>
  );
}