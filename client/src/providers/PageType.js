import { useEffect, useState } from "react";
import { withRouter } from "react-router";

const PageType = (props) => {
  const [type, setType] = useState("plan");

  const setCurrentPage = () => {
    const pageTypes = ["plan", "recipes", "grocerylist", "signup", "login"];
    const {
      location: { pathname },
    } = props;

    const [currentPage] = pageTypes.filter((page) => pathname.includes(page));

    if (type !== currentPage) {
      setType(currentPage);
    }
  };

  useEffect(() => setCurrentPage());

  return props.render(type);
};

export default withRouter(PageType);
