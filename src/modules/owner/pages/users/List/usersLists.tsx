// src/components/UsersList.tsx
import { useEffect, useState } from "react";
import { UserModel } from "../../../../../models/UserModel";
import { getUsers } from "../../../../../api/userApi";
import TblInformation from "../../../components/TblInformation";

const UsersList = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getUsers();        
        setUsers(response.data.user);
      } catch {
        setError("Error al cargar la data");
      }
    }
    fetchData();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <TblInformation data={users} />
    </div>
  );
};

export default UsersList;
