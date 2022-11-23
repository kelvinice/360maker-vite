export interface CustomMarkerDataTypeModel {
    code: string;
    name: string;
}

export const CustomMarkerDataType = {
    buttonLink: {
        code: 'buttonLink',
        name: 'Button Link'
    } as CustomMarkerDataTypeModel,
    slideImage: {
        code: 'slideImage',
        name: 'Slide Image'
    } as CustomMarkerDataTypeModel,
}