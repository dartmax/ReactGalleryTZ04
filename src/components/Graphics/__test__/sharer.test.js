import {shareDocumentWithStudent} from "../shared"
import {google} from "googleapis";
import creds from "../creds";

const fieldId = "10iNuKCWIhLG9jbDo9IcLGEz6wD4IeqB3ZTCS_sPCiHA"

describe("student sharer", () => {
  describe("student sharer", () => {
    it("authorizas on google with JWT", async () => {
      const OriginalJWT = google.auth.JWT
      google.auth.JWT = jest.fn().mockImplementation(function(...args) {
        const instance = new OriginalJWT(...args)
        jest.spyOn(instance, 'authorize')
        this.authorize = jest.fn()
        this.credentials = {access_token: "FAKE_ACCESS_TOKEN"}
      })
      jest.spyOn(google.auth, 'JWT')
      try{
        await shareDocumentWithStudent(fieldId)
      }catch{}

      const jwtInstance = google.auth.JWT.mock.instances[0]
      expect(jwtInstance.authorize).toHaveBeenCalledWith()
    })

    it("shareDocumentWithStudent is a function", () => {
      expect(typeof shareDocumentWithStudent).toBe("function")
    })
  })
})