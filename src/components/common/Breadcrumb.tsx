import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const Breadcrumb: React.FC = () => {
  const url = window.location.href;
  const WebUrl = import.meta.env.VITE_WEB_URL;
  let path = url.substring(WebUrl.length);
  path = path.substring(0, path.lastIndexOf("/"));

  let generateBreadcrumbs = (path: string) => {
    let breadcrumbs = [];
    while (path.length > 0) {
      breadcrumbs.push(path);
      path = path.substring(0, path.lastIndexOf("/"));
    }
    breadcrumbs.push("/");
    return breadcrumbs.reverse();
  };

  let breadcrumbs = generateBreadcrumbs(path);

  return (
    <ul className="flex items-center text-white">
      {breadcrumbs.map((breadcrumb) => (
        <Link to={breadcrumb} className="flex items-center" key={breadcrumb}>
          <small>
            {breadcrumb === "/"
              ? "HJEM"
              : breadcrumb
                  .substring(breadcrumb.lastIndexOf("/") + 1)
                  .toUpperCase()}
          </small>
          <MdKeyboardDoubleArrowRight />
        </Link>
      ))}
    </ul>
  );
};
export default Breadcrumb;
