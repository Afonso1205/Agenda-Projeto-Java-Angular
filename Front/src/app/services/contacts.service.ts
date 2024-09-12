import { Injectable } from "@angular/core"
import axios from "axios"
import { environment } from "../../environments/environment"
import { Observable } from "rxjs"
import { IContact } from "../../interfaces"

const BASE_URL = environment.backendUrl

@Injectable({
  providedIn: "root",
})
export class ContactsService {
  constructor() {}

  private server = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  })

  getContactById(id: number): Observable<IContact> {
    return new Observable<IContact>((observer) => {
      this.server
        .get(`/contacts/${id}`)
        .then((response) => {
          observer.next(response.data)
          observer.complete()
        })
        .catch((error) => {
          observer.error(error)
        })
    })
  }


  getAllContacts(): Observable<IContact[]> {
    return new Observable<IContact[]>((observer) => {
      this.server
        .get("/contacts")
        .then((response) => {
          observer.next(response.data)
          observer.complete()
        })
        .catch((error) => {
          observer.error(error)
        })
    })
  }

  createContact(contact: FormData): Observable<IContact> {
    return new Observable<IContact>((observer) => {
      this.server
        .post("/contacts", contact)
        .then((response) => {
          observer.next(response.data)
          observer.complete()
        })
        .catch((error) => {
          observer.error(error)
        })
    })
  }

  removeContact(contactId: number): Observable<IContact> {
    return new Observable<IContact>((observer) => {
      this.server
        .delete(`/contacts/${contactId}`)
        .then((response) => {
          observer.next(response.data)
          observer.complete()
        })
        .catch((error) => {
          observer.error(error)
        })
    })
  }

  removeMultipleContacts(contactIds: number[]): Observable<any> {
    return new Observable<any>((observer) => {
      this.server
        .delete("/contacts/deleteMultiple", {
          data: contactIds,
        })
        .then((response) => {
          observer.next(response.data)
          observer.complete()
        })
        .catch((error) => {
          observer.error(error)
        })
    })
  }

  updateContact(contact: IContact): Observable<IContact> {
    return new Observable<IContact>((observer) => {
      this.server
        .put(`/contacts/${contact.id}`, contact)
        .then((response) => {
          observer.next(response.data)
          observer.complete()
        })
        .catch((error) => {
          observer.error(error)
        })
    })
  }
}