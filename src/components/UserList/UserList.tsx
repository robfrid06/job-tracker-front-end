import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import * as userService from '../../services/userService';
import UserCard from '../UserCard/UserCard';
import UserForm from '../UserForm/UserForm';
import styles from './UserList.module.scss';
import SearchBar from '../SearchBar/SearchBar';

const UserList = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(['users'], userService.index);

  const [search, setSearch] = useState('');

  const handleSearch = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(evt.target.value);
  }

  const searchedUsers = data?.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );
  const users = searchedUsers?.sort((a, b) => a.name > b.name ? 1 : -1);;

  return (
    <section className={styles.container}>
      <div className={styles.filters}>
        <SearchBar search={search} setSearch={setSearch} placeholder="Search" />
      </div>
      {!search && <UserForm />}
      {users?.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </section>
  );
}
 
export default UserList;