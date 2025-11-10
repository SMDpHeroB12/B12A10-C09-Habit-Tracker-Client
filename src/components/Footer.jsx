import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-10">
      <div className="w-11/12 mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo & Name */}
          <div>
            <h2 className="text-2xl font-bold text-primary">Habit Tracker</h2>
            <p className="mt-2 text-sm">
              Build better habits, one day at a time.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Contact</h3>
            <p>Email: smdwcloud@gmail.com</p>
            <p>Phone: +880-179-1717-966</p>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-4 text-2xl">
              <Link
                className="hover:text-primary transition"
                to="https://facebook.com/shekhmdnayem"
                target="_blank"
              >
                <FaFacebook />
              </Link>
              <Link
                className="hover:text-primary transition"
                to="https://github.com/SMDpHeroB12"
                target="_blank"
              >
                <FaGithub />
              </Link>
              <Link
                className="hover:text-primary transition"
                to="https://x.com/ShekhMDNayem"
                target="_blank"
              >
                <FaXTwitter />
              </Link>
              <Link
                className="hover:text-primary transition"
                to="https://www.linkedin.com/in/shekhmdnayem/"
                target="_blank"
              >
                <FaLinkedin />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-4 text-center text-sm opacity-70">
          © {new Date().getFullYear()} Habit Tracker — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
