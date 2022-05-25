import { FileType, ValidatorType, ValidatorTypeObj } from "src/common/type/type";
export declare const type: ValidatorTypeObj;
export declare const file: (files: any[], maxSize: number, type: ValidatorType) => FileType[];
