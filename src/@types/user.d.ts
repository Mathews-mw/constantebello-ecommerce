import { User, UserInfo, UserAddress } from "@prisma/client"

interface IUserInfosDetails extends UserInfo {
  userAddress: Array<UserAddress>
}

interface IUserWithInfos extends User {
  userInfos: UserInfo
}

interface IUserDetails extends User {
  userInfos: IUserInfosDetails
}