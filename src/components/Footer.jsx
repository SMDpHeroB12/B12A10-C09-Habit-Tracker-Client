import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import logo from "/vite.svg";
import { useAuth } from "../hooks/useAuth";

const Footer = () => {
  const { user } = useAuth();

  const socialLinks = [
    {
      label: "Facebook",
      href: "https://facebook.com/shekhmdnayem",
      icon: <FaFacebook />,
    },
    {
      label: "GitHub",
      href: "https://github.com/SMDpHeroB12",
      icon: <FaGithub />,
    },
    {
      label: "X",
      href: "https://x.com/ShekhMDNayem",
      icon: <FaXTwitter />,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/shekhmdnayem/",
      icon: <FaLinkedin />,
    },
  ];

  return (
    <footer className="bg-base-200 text-base-content mt-10">
      <div className="w-11/12 mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Brand */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <img className="h-10" src={logo} alt="Habit Tracker Logo" />
              <h2 className="text-2xl font-bold text-primary">Habit Tracker</h2>
            </div>
            <p className="mt-3 text-sm text-base-content/70 max-w-xs mx-auto md:mx-0">
              Build better habits, one day at a time. Track consistency, grow
              streaks, and stay motivated.
            </p>
          </div>

          {/* Quick Links (WORKING LINKS ONLY) */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link className="link link-hover" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="link link-hover" to="/browse">
                  Browse Public Habits
                </Link>
              </li>
              <li>
                <Link className="link link-hover" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="link link-hover" to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="link link-hover" to="/privacy">
                  Privacy Policy
                </Link>
              </li>

              {user && (
                <>
                  <div className="divider my-3"></div>
                  <li>
                    <Link className="link link-hover" to="/add-habit">
                      Add Habit
                    </Link>
                  </li>
                  <li>
                    <Link className="link link-hover" to="/my-habits">
                      My Habits
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Contact</h3>
            <div className="space-y-1 text-sm">
              <p>
                Email:{" "}
                <a
                  className="link link-hover"
                  href="mailto:smdwcloud@gmail.com"
                >
                  smdwcloud@gmail.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a className="link link-hover" href="tel:+8801791717966">
                  +880-179-1717-966
                </a>
              </p>
            </div>

            <h3 className="font-semibold text-lg mt-6 mb-3">Follow</h3>
            <div className="flex justify-center md:justify-start gap-4 text-2xl">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  className="hover:text-primary transition"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-base-300 mt-8 pt-4 text-center text-sm text-base-content/70">
          © {new Date().getFullYear()} Habit Tracker — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
