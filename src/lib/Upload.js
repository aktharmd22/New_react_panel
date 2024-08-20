import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from './firebase';

const Upload = async (file) => {
    const date = new Date().toISOString().replace(/[-:.TZ]/g, "");

    const storageRef = ref(storage, `images/${date}-${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                reject("Upload failed: " + error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                }).catch((error) => {
                    reject("Failed to get download URL: " + error.message);
                });
            }
        );
    });
};

export default Upload;
