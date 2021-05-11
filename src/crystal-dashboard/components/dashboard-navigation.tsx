import { Link, useHistory } from 'react-router-dom';
import { MainPath } from 'src/core/enums/main-path';
import Navigation from 'src/core/models/navigation';

export default function DashboardNavigation(props: { navigation: Navigation[]; currentUrl: string }) {
  const { navigation, currentUrl } = props;
  const history = useHistory();
  const signOut = () => {
    history.push(MainPath.EmployeeLogin);
  };

  return (
    <div className="flex flex-col bg-blue-50 h-full border-r border-gray-300 p-5" style={{ flex: '0 0 250px' }}>
      <div className="flex-1 space-y-4">
        {navigation.map((nav) => (
          <Link key={nav.key} className="flex justify-between" to={`${currentUrl}${nav.path}`}>
            <label className="text-xl">{nav.text}</label>
            <span> {'>'} </span>
          </Link>
        ))}
      </div>
      <button onClick={signOut}>登出</button>
    </div>
  );
}
