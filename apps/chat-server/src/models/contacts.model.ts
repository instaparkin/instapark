import { Schema, Document, model, models, Model } from "mongoose";

export interface IContact extends Document {
  userId: string;
  contactUserId: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

const contactSchema = new Schema<IContact>(
  {
    userId: { type: String, required: true },
    contactUserId: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    version: { type: Number, default: 1 },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const Contact: Model<IContact> = models.Contact || model<IContact>("Contact", contactSchema);

export { Contact, contactSchema };
