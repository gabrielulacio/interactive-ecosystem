import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDOM420tNCP676TJZZivIcSz6jrmAVMDJA",
  authDomain: "interactive-ecosystem-project.firebaseapp.com",
  databaseURL: "https://interactive-ecosystem-project-default-rtdb.firebaseio.com",
  projectId: "interactive-ecosystem-project",
  storageBucket: "interactive-ecosystem-project.firebasestorage.app",
  messagingSenderId: "660523438490",
  appId: "1:660523438490:web:2cd163e201687084ddea23"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getDatabase(firebaseApp);
