import { CgGirl } from "react-icons/cg";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="text-gray-600 body-font bg-[#f8f2ef]">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        
        {/* Logo + Short Intro */}
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10">
          <p className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <CgGirl className="text-2xl" />
            <span className="ml-3 text-xl font-semibold">Personal Styling</span>
          </p>
          <p className="mt-2 text-sm text-gray-500">
            AI-powered personal styling — helping you discover the clothing
            styles and colors that truly bring out your best look.
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first">
          {
  [
    {
      title: "Product",
      links: [
        { label: "How it works", href: "/component/about" },
        { label: "Features", href: "/component/features" },
        { label: "FAQ", href: "/component/faq" },
        { label: "Pricing", href: "/component/pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "https://www.linkedin.com/in/glam-aura-087205387?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
        { label: "Contact", href: "/component/contact" },
        { label: "Privacy Policy", href: "/component/privacy-policy" },
        { label: "Terms", href: "/component/terms-and-conditions" },
      ],
    },
  ].map((section, i) => (
    <div key={i} className="lg:w-1/4 md:w-1/2 w-full px-4">
      <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
        {section.title}
      </h2>
      <nav className="list-none mb-10">
        {section.links.map((link, idx) => (
          <li key={idx}>
            <a
              href={link.href}
              className="text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              {link.label}
            </a>
          </li>
        ))}
      </nav>
    </div>
  ))
}

          {/* Social Links Section */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              Follow Us
            </h2>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a
                href="https://www.instagram.com/glamaura387/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-600 text-2xl"
              >
                <FaInstagram />
              </a>
              <a
                href="https://x.com/HumemaA44967"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-400 text-2xl"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61581457560218"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 text-2xl"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.linkedin.com/in/glam-aura-087205387?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-700 text-2xl"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2025 Made by Humema & Faria — Personal Styling Platform
          </p>
        </div>
      </div>
    </footer>
  );
}
