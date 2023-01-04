import GeneratePasswordLogo from "@app/assets/images/generatepasswordlogo.png";
import Github from "@app/assets/images/github.png";

export const carouselConstants = [
  {
    title:
      "Generate all your passwords deterministically using your Master Key",
    description:
      "Your Master Key is your one and only backup of all passwords.",
    src: GeneratePasswordLogo,
  },
  {
    title: "Philosophy",
    description:
      `- No central server. No server at all. Fully client side. Works Offline.  \n- No data to store or share.  \n- No data or passwords to backup. Backup your Master Key only.\n- No hidden agenda or false promise of security. We’re open source. Check the code for yourself`,
    src: GeneratePasswordLogo,
  },
  {
    title: "Source Code",
    description:
      `https://github.com/sireto/offlinepass`,
    src: Github,
  },
];
