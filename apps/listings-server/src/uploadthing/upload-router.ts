import { createUploadthing, type FileRouter } from 'uploadthing/express';

const f = createUploadthing();

export const uploadRouter = {
	imageUploader: f({
		image: {
			maxFileSize: '4MB',
			minFileCount: 4,
			maxFileCount: 8,
		},
	}).onUploadComplete((data) => {
		console.log('upload completed', data);
	}),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
