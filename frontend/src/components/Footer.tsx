import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full p-2 border-t border-gray-700 flex text-center text-gray-400 text-xs items-center justify-between">
      <p>© 2025 IntenX. All rights reserved.</p>
      <a
        href="https://github.com/Aniket-Kumar-Paul/intenX"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white transition"
      >
        <FaGithub size={18} />
      </a>
    </footer>
  );
};

export default Footer;