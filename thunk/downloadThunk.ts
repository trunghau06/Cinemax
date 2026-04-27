import { collection, getDocs } from "firebase/firestore";
import { auth, db } from './../services/firebase';
import { setDownloads } from "../redux/download/downloadSlice";

export const fetchDownloads = () => async (dispatch: any) => {
    const user = auth.currentUser;
    if (!user) return;

    const snap = await getDocs(
        collection(db, "users", user.uid, "downloads")
    );

    const movies = snap.docs.map(doc => ({
        id: doc.data().id,
        title: doc.data().title,
        poster_path: doc.data().poster_path,
        vote_average: doc.data().vote_average || 0,
        genres: doc.data().genres || [],
        progress: doc.data().progress || 0,
        status: doc.data().progress >= 100 ? "completed" : "downloading"
    }));

    dispatch(setDownloads(movies as any));
};