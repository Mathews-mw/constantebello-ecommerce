import { User, UserInfo } from "@prisma/client"

interface IUserInfosDetails extends UserInfo {
  userAddress: Array<CustomerAddress>
}

interface IUserDetails extends User {
  userInfos: IUserInfosDetails
}