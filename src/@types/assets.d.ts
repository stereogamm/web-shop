//this file contains general types for assets(icons, imgs etc..)

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "*.svg" {
  const content: any; //NEED to Fix any type
  export default content;
}
/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "*.png" {
  const asset: any; //NEED to Fix any type
  export default asset;
}

declare module "*.scss" {
  const styles: { [key: string]: string };
  export default styles;
}
