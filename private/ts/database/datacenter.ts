import { FirebaseOptions } from "firebase/app";
import { initializeApp } from "firebase/app";
import { FirebaseApp } from "firebase/app";
import dotenv from 'dotenv'
dotenv.config()

const firebaseConfig : FirebaseOptions = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: "yami-533cf",
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID
};

const app : FirebaseApp = initializeApp(firebaseConfig);

import { getFirestore, collection, getDocs, doc } from 'firebase/firestore/lite';
import { Firestore, QuerySnapshot, CollectionReference, DocumentData, DocumentReference } from "firebase/firestore/lite";

const root : Firestore = getFirestore(app)

/**
 * 모든 상품 목록 조회
 * 
 * 코스 정보 조회와는 달리 구조가 단순하여 부담이 별로 크지않다.
 * @returns 아이템 리스트
 */
export async function getAllItems() : Promise<DocumentData[] | null> {
  const col : CollectionReference = collection(root, 'Item') // 아이템 컬렉션 참조 생성
  const snapshot : QuerySnapshot = await getDocs(col) // 모든 상품 불러오기
  const itemList : Array<DocumentData> = [] // 저장 공간 할당

  snapshot.forEach(item => {
    const boxing = {
      ...item.data(),
      상품이름: item.id
    }
    itemList.push(boxing)
  })
  return itemList.length > 0 ? itemList : null
}

/**
 * 모든 코스 정보 조회
 * 
 * 서버 첫 초기화 시에만 호출 하는 것을 권장.
 * @returns 코스 데이터 리스트
 */
export async function getAllCourse() : Promise<DocumentData[]> {
  const col : CollectionReference = collection(root, 'Course') // 코스 컬렉션 참조 생성
  const courseListDocs : QuerySnapshot = await getDocs(col) // 모든 코스 불러오기
  const courseList : Array<DocumentData> = [] // 저장 공간 할당

  courseListDocs.forEach(course => courseList.push(course.data()))

  return courseList
}

import { getDoc, DocumentSnapshot } from "firebase/firestore/lite";

export async function getUserData(userId : string | undefined , userPass : string) : Promise<DocumentData | undefined> {
  if(userId !== undefined) {
    const col : CollectionReference = collection(root, 'User') // 유저 컬렉션 참조 생성
    const userDoc : DocumentReference = doc(col, userId)
    const userData : DocumentSnapshot = await getDoc(userDoc)
    const data : DocumentData | undefined = userData.data()

    if(data) {
      if(data.pass === userPass) return data
      else return undefined
    } else return undefined
  } else {
    const err : Error = new Error('매개 변수에 값이 할당되지 않음')
    throw err
  }
}

import { updateDoc, serverTimestamp } from "firebase/firestore/lite";
import { UserUpdateDto } from "../../routes/user/dto/user.dto";

export async function update(userId : string | undefined, updateData: UserUpdateDto) : Promise<void> {
  if(userId !== undefined || updateData !== undefined) {
    const userColRef : CollectionReference = collection(root, 'User')
    const userDocRef : DocumentReference = doc(userColRef, userId)
    await updateDoc(userDocRef, {
      profile: JSON.stringify(updateData),
      timestamp: serverTimestamp()
    })
  } else {
    const err : Error = new Error('매개 변수에 값이 할당되지 않음')
    throw err
  }
}