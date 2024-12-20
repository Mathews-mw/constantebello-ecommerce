import type { CustomerAddress, CustomerInfo, User } from "@prisma/client";

interface ICustomerInfosDetails extends CustomerInfo {
  customerAddress: Array<CustomerAddress>
}

interface ICustomer extends User {
  customerInfos: ICustomerInfosDetails
}