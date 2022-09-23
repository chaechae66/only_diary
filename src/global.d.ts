declare module "*.module.css" {
    const content: { [className: string]: string };
    export = content;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

declare module 'uuid'