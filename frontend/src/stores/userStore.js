import { create } from 'zustand';
import fetchUser from '../services/fetchUser';




const useUserStore = create((set, get) => ({
    user: {
        user: {
            _id: '65854380aa6b07046cf14509'
        }
    },
    setUser: (user) => set({ user }),

    logout: () => set({ user: {} }),
    updateUser: async () => {
        const { user } = get();
        if (user?.user?._id) {
            const fetchedUser = await fetchUser(user.user._id);
            set({ user: fetchedUser });
        }

    },
}));

export default useUserStore;