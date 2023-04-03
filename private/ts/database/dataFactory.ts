interface LanLng {
    lanLng : string
}
interface PriviewData {
latitudeDelta : number,
longitudeDelta : number,
location : LanLng
}
interface CourseMarker {
infoText : string,
courseName : string
}
interface CourseDirection {
latitudeDelta : number,
longitudeDelta : number,
startLocation : LanLng,
endLocation : LanLng
}
interface Content {
courseName : string,
infoText : string,
title : string
}
interface CourseAddress {
gu : string,
city : string,
detailAddress : string
}
interface Detail {
distance : number, // 단위 km
ET : number, // 단위 시간
difficulty : number
}
interface Information {
detail : Detail,
courseAddress : CourseAddress,
content : Content,
imageURL : string
}
interface MapData {
previewData : PriviewData,
courseMarker : CourseMarker,
courseDirection : CourseDirection,
titleImageURL : string
}

export declare interface Course {
information : Information,
mapData : MapData
}

export declare interface User {
    profile : string
}