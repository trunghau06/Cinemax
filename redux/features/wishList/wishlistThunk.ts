import { auth, db } from '../../../services/firebase';
import { collection, getDocs } from "firebase/firestore";
import { setWishList } from './wishSlice';

export const fetchWishList = () => async (dispatch: any) => {
    const user = auth.currentUser;
    if (!user) return;

    const snap = await getDocs(
        collection(db, "users", user.uid, "wishlist")
    );

    const movies = snap.docs.map(doc => doc.data());

    dispatch(setWishList(movies as any));
};