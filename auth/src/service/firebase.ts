import * as admin from "firebase-admin";
import { serviceAccount } from "./serviceAccount";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: "ss-project-42dc0.appspot.com",
});

const bucket = admin.storage().bucket();

export { bucket, admin };
