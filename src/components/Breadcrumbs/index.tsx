
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {T_Topic} from "modules/types.ts";
import {isHomePage, isTopicPage} from "utils/utils.ts";

interface BreadcrumbsProps {
    selectedTopic: T_Topic | null
}

const Breadcrumbs = ({ selectedTopic }: BreadcrumbsProps) => {

    const location = useLocation()

    return (
        <Breadcrumb className="fs-5">
			{isHomePage(location.pathname) &&
				<BreadcrumbItem>
					<Link to="/">
						Главная
					</Link>
				</BreadcrumbItem>
			}
			{location.pathname.includes("/topics") &&
                <BreadcrumbItem active>
                    <Link to="/topics">
						Темы
                    </Link>
                </BreadcrumbItem>
			}
            {isTopicPage(location.pathname) &&
                <BreadcrumbItem active>
                    <Link to={location.pathname}>
                        { selectedTopic?.name }
                    </Link>
                </BreadcrumbItem>
            }
			<BreadcrumbItem />
        </Breadcrumb>
    );
};

export default Breadcrumbs
