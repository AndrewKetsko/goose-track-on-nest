// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: async (req, file) => {
//     let folder;
//     if (file.fieldname === 'avatar') {
//       folder = 'avatars';
//     } else if (file.fieldname === 'documents') {
//       folder = 'documents';
//     } else {
//       folder = 'misc';
//     }

//     const transformation = {
//       width: 250,
//       height: 250,
//       crop: 'fill',
//     };
//     return {
//       folder: folder,
//       allowed_formats: ['jpg', 'png', 'gif'],
//       //   public_id: `${req.user._id}`,
//       transformation: transformation,
//     };
//   },
// });
