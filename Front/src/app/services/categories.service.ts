import { Injectable } from "@angular/core"
import axios from "axios"
import { environment } from "../../environments/environment"
import { Observable } from "rxjs"
import { ICategory } from "../../interfaces"

const BASE_URL = environment.backendUrl

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  constructor() {}

  private server = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  })

  getAllCategories(): Observable<ICategory[]> {
    return new Observable<ICategory[]>((observer) => {
      this.server
        .get("/categories")
        .then((response) => {
          observer.next(response.data)
          observer.complete()
        })
        .catch((error) => {
          observer.error(error)
        })
    })
  }


  createCategory(category: ICategory): Observable<ICategory> {
    return new Observable<ICategory>((observer) => {
      this.server
        .post("/categories", category)
        .then((response) => {
          observer.next(response.data)
          observer.complete()
        })
        .catch((error) => {
          observer.error(error)
        })
    })
  }

  removeCategory(categoryId: number): Observable<ICategory> {
    return new Observable<ICategory>((observer) => {
      this.server
        .delete(`/categories/${categoryId}`)
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
