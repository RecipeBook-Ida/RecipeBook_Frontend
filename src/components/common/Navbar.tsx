import NavLink from "./NavLink";

const Navbar: React.FC = () => {
  const links = [
    {
      path: "/profil",
      text: "Profil",
      roles: ["User", "dev"],
    },
    {
      path: "/oppskrifter",
      text: "Oppskrifter",
      roles: ["Admin", "User", "dev"],
    },
    {
      path: "/ingredient",
      text: "Ingredients",
      roles: ["Admin", "User", "dev"],
    },
  ];

  // Replace this to view the navbar as a different user
  let devUserRole = "dev";

  // Replace devUserRole with userRole in prod
  const filteredLinks = links.filter((link) =>
    link.roles.includes(devUserRole)
  );

  return (
    <nav className="bg-bookBase-dark fixed inset-x-0 top-0 shadow-md text-white h-fit z-20">
      <div className="flex items-center justify-between h-20">
        <ul className="hidden md:flex space-x-4 px-6 slide-in-links">
          {filteredLinks.map((link) => (
            <NavLink to={link.path} text={link.text} key={link.text} />
          ))}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
