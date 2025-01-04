export interface IColor {
  _id: string;
  name: string;
  hexCode: string;
  isTrending?: boolean;
  colorGroup?: string;
  createdAt: Date;
  updatedAt: Date;
}