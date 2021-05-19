import AllowUser from 'src/core/models/allow-user';
import useHttpClient from 'src/utils/customer-hook/useHttpClient';

export default function CrystalProductList() {
  const { list: allowList } = useHttpClient<AllowUser>('allowList');
  const { list: products } = useHttpClient('crystalProduct');

  console.log(allowList);

  return (
    <div className="flex">
      <div>
        {allowList.map((user) => (
          <div>{user.phone}</div>
        ))}
      </div>
    </div>
  );
}
