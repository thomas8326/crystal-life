import { Link } from 'react-router-dom';
import Navigation from 'src/core/models/navigation';

export default function DashboardNavigation(props: { navigation: Navigation[] }) {
  const { navigation } = props;
  return (
    <div className="bg-blue-50 h-full border-r border-gray-300 p-5 space-y-4" style={{ flex: '0 0 250px' }}>
      {navigation.map((nav) => (
        <Link className="flex justify-between" to={nav.path}>
          <label className="text-xl">{nav.text}</label>
          <span> {'>'} </span>
        </Link>
      ))}
    </div>
  );
}
