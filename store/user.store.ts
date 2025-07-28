// counter.store.js
import React from 'react';
import { makeObservable, action, observable } from 'mobx';

class UserStore {
  user: any = null;

  constructor() {
    makeObservable(this, {
      user: observable,
      setUser: action.bound,
    })
  }
  setUser(user: any) {
    this.user = user;
  }
}

const userStore = new UserStore();
export const UserStoreContext = React.createContext(userStore);
export const useUserStore = () => React.useContext(UserStoreContext);
