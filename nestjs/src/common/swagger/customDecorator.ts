import {applyDecorators, Type} from "@nestjs/common";
import {ApiExtraModels, ApiOkResponse, getSchemaPath} from "@nestjs/swagger";
import {SelectListResponseType} from "../type/type";

export const ApiOkResponseSelectList = <DataDto extends Type<unknown>>(dataDto: DataDto) =>
    applyDecorators(
        ApiExtraModels(SelectListResponseType, dataDto),
        ApiOkResponse({
            schema: {
                allOf: [
                    { $ref: getSchemaPath(SelectListResponseType) },
                    {
                        properties: {
                            items: {
                                type: 'array',
                                items: { $ref: getSchemaPath(dataDto) },
                            },
                        },
                    },
                ],
            },
        })
    )