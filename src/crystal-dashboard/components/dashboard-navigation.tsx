import { Link, NavLink, useHistory } from 'react-router-dom';
import { MainPath } from 'src/core/enums/main-path';
import Navigation from 'src/core/models/navigation';
import { useAuth } from 'src/utils/customer-hook/useAuth';

export default function DashboardNavigation(props: { navigation: Navigation[]; currentUrl: string }) {
  const { navigation, currentUrl } = props;
  const { adminLogout } = useAuth();
  const history = useHistory();
  const signOut = () => {
    adminLogout();
    history.push(MainPath.EmployeeLogin);
  };

  return (
    <nav className="flex flex-col bg-blue-50 h-full border-r border-gray-300 p-5" style={{ flex: '0 0 250px' }}>
      <div className="flex-1 divide-y divide-indigo-300 ">
        {navigation.map((nav) => (
          <NavLink
            key={nav.key}
            className="flex justify-between py-4 hover:bg-blue-200"
            activeClassName="bg-blue-100"
            to={`${currentUrl}${nav.path}`}
          >
            <label className="text-xl">{nav.text}</label>
            <i className="icon icon-right-arrow" />
          </NavLink>
        ))}
      </div>
      <button onClick={signOut}>登出</button>
    </nav>
  );
}
