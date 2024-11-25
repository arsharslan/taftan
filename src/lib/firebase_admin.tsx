// lib/firebaseAdmin.js
import admin from 'firebase-admin';

if (!admin.apps.length && process.env.FIREBASE_ADMIN_CREDENTIALS) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS)),
  });
}

export const verifyIdToken = async (token: string) => {
  try {
    const user = await admin.auth().verifyIdToken(token);
    return user;
  } catch (error) {
    throw new Error('Token verification failed');
  }
};
