import { CloudinaryContext, Image, Transformation, Video, } from 'cloudinary-react';

export const SubidaImagenes = () => {
	const handleUploadSuccess = (fileInfo) => {
		console.log(fileInfo.secure_url);
	  };
  return (
	<div>
      <ImageUploader
        cloudName="djnzoyal5"
        uploadPreset="preset_pabs"
        onSuccess={handleUploadSuccess}
      />
    </div>
  )
}
