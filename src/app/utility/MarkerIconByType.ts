import {
    CustomMarkerIconPath,
    DescriptionMarkerIconPath,
    ImageMarkerIconPath, LinkMarkerIconPath,
    PlaceMarkerIconPath,
    VideoMarkerIconPath
} from "../constants/AssetPath";
import {MarkerType} from "../constants/MarkerType";

export default function MarkerIconByType(type: string): string {
    switch (type) {
        case MarkerType.PLACE:
        return PlaceMarkerIconPath;
        case MarkerType.VIDEO:
        return VideoMarkerIconPath;
        case MarkerType.IMAGE:
        return ImageMarkerIconPath;
        case MarkerType.DESCRIPTION:
        return DescriptionMarkerIconPath;
        case MarkerType.LINK:
        return LinkMarkerIconPath;
        case MarkerType.CUSTOM:
        return CustomMarkerIconPath;
        default:
        return CustomMarkerIconPath;
    }
}