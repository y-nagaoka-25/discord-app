import { collection, DocumentData, onSnapshot, Query, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';

interface Channel {
    id: string;
    channel: DocumentData;
}

const useCollection = (data: string) => {
    const [documents, setDocuments] = useState<Channel[]>([]);
    const collectionRef: Query<DocumentData> = query(collection(db, data));

    useEffect(() => {
        const channelsResults: Channel[] = [];
        onSnapshot(collectionRef, querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                channelsResults.push({
                    id: doc.id,
                    channel: doc.data(),
                })
            });
            setDocuments(channelsResults);
        })
    }, []);

    return { documents };
}

export default useCollection
