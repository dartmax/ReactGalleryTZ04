import {google} from "googleapis";
import creds from "./creds.js";
import LiqPay from "./liqpay.js";

//configure a JWT auth client
const fieldId = "10iNuKCWIhLG9jbDo9IcLGEz6wD4IeqB3ZTCS_sPCiHA"

export async function shareDocumentWithStudent(fieldId){

  let jwtClient = new google.auth.JWT(
    creds.client_email,
    null,
    creds.private_key,
    ["https://www.googleapis.com/auth/drive"]
  );
  //authenticate request
  await jwtClient.authorize();
  const drive = google.drive({version: "v3"})

  const list = await drive.permission.list({
    fieldId,
    oauth_token: jwtClient.credentials.access_token,
    fields: ["permission(emailAddress)"]
  })

  console.log(list.data.permissions.length)

  const enrolledEmails = list.data.permissions.map((x) => {
    x.emailAddress.toLowerCase()
  })

  const liqpay = new LiqPay(
    "sandbox_i59485578196",
    "sandbox_1hSSBDxHWyQV3CDgW4dLi2IAyBKv54jGWb62ZGZ1"
  )

  const payments = await new Promise((resolve, reject) => {
    liqpay.api(
      "request",
      {
        action: "reports",
        version: 3,
        public_key: "sandbox_i59485578196",
        date_from: Date.now() - 30 * 24 * 60 * 60 * 1000,
        date_to: Date.now()
      },
      resolve,
      reject
    )
  })

  for (const p of payments.data){
    if(
      p.description === "Masterclass about jest testing" && p.order_id.includes(" /// ")
    ){
      const mail = p.order_id.split(" /// ")[0].trim()
      if(mail === "admin@gmail.com") {
        continue
      }
    if(p.status === "success" && !enrolledEmails.includes(mail)){
      await drive.permission.create({
        fieldId,
        oauth_token: jwtClient.credentials.access_token,
        emailAddress: mail,
        resource: {
          emailAddrerss: mail,
          type: "user",
          role: "commenter",
          emailMessage: "Hello, there is masterclass Jest-nonja"
        },
        emailMessage: "Hello, there is masterclass Jest-nonja"
      })
      console.log(`[+] ${mail}`)
    }
    }
  }
}