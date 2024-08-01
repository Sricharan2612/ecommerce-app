import { useEffect, useState } from 'react';
//Firebase
import { db } from '../Firebase/firebase.config';
import { collection, onSnapshot } from 'firebase/firestore';


const useGetData = (collectionName) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const collectionRef = collection(db, collectionName);

    //useEffect
    useEffect(() => {
        const getData = async () => {
            //updating the data in realtime on the firestore
            onSnapshot(collectionRef, (snapshot) => {
                setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
                setLoading(false);
            });

        };
        getData();
    }, []);

    return { data, loading };
};


export default useGetData;
