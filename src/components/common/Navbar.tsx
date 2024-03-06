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
    <ul className="flex space-x-2 ml-20 pt-2">
      {filteredLinks.map((link) => (
        <NavLink to={link.path} text={link.text} key={link.text} />
      ))}
    </ul>
  );
};
export default Navbar;
