import { DASHBOARD_NAVIGATION } from 'src/core/constants/constants';

export default function DashboardNavigation() {
  return (
    <div className="bg-blue-50 h-full border-r border-gray-300 p-5 space-y-4" style={{ flex: '0 0 250px' }}>
      {DASHBOARD_NAVIGATION.map((navigation) => (
        <div className="flex justify-between">
          <label className="text-xl">{navigation.text}</label>
          <span> {'>'} </span>
        </div>
      ))}
    </div>
  );
}
