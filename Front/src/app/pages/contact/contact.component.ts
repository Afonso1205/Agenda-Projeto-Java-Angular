import { CategoriesService } from "./../../services/categories.service"
import { Component } from "@angular/core"
import { ContactsService } from "../../services/contacts.service"
import { ActivatedRoute, Route, Router } from "@angular/router"
import { ICategory, IContact } from "../../../interfaces"
import { Guid } from "guid-typescript"

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
})
export class ContactComponent {
  public loading: boolean = true
  public user: IContact = {} as IContact
  public isEditing: boolean = false

  constructor(
    private _contactService: ContactsService,
    private route: ActivatedRoute,
    private categoryService: CategoriesService
  ) {}

  ngOnInit(): void {
    let userId = Number(this.route.snapshot.params["id"])

    this._contactService.getContactById(userId).subscribe({
      next: (data) => {
        this.user = data
        // Parse birthdate from "aaaa-mm-dd" to "dd/mm/aaaa"
        // let birthDate = new Date(this.user.birthdate);
        // let ageDifMs = Date.now() - birthDate.getTime();
        // let newBirthDate = this.user.birthdate;
        // this.user.birthdate = data.birthdate
        this.loading = false
        console.log(this.user)
      },
      error: (error) => {
        console.error(error)
        this.loading = false
      },
      complete: () => {
        this.loading = false
      },
    })
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing

    if (!this.isEditing && this.user) {
      this.loading = true
      this._contactService.updateContact(this.user).subscribe({
        next: (updatedUser) => {
          this.user = updatedUser
          // Reformat birthdate

          this.loading = false
        },
        error: (error) => {
          console.error(error)
        },
      })
    }
  }

  updateUser(): void {
    if (this.user) {
      this.loading = true
      this._contactService.updateContact(this.user).subscribe({
        next: (updatedUser) => {
          this.user = updatedUser
          // Reformat birthdate
          let birthDate = new Date(this.user.birthdate)
          let ageDifMs = Date.now() - birthDate.getTime()
          let newBirthDate = this.user.birthdate
          this.user.birthdate = newBirthDate

          this.loading = false
        },
        error: (error) => {
          console.error(error)
          this.loading = false
        },
      })
    }
  }


  draggedCategoryItemId: number | null = null

  handleCategoryClick(categoryId: number): void {}

  onDragStartCategory(event: DragEvent, itemId: number): void {
    this.draggedCategoryItemId = itemId
    event.dataTransfer?.setData("text/plain", itemId.toString())
  }

  onDragEndCategory(event: DragEvent): void {
    this.draggedCategoryItemId = null
  }

  onDropCategory(event: DragEvent): void {
    event.preventDefault()
    const itemId = event.dataTransfer?.getData("text/plain")

    this.user.categories.map((category: any) => {
      if (category.id === Number(itemId)) {
        this.user.categories = this.user.categories.filter(
          (category) => category.id !== Number(itemId)
        )
      }
    })
  }

  onDragOverCategory(event: DragEvent): void {
    event.preventDefault()
  }

  newCategoryName: string = ""

  addNewCategory(): void {
    if (!this.newCategoryName || this.newCategoryName.length < 2) return

    let available = [
      "bg-blue-900",
      "bg-green-900",
      "bg-yellow-900",
      "bg-red-900",
      "bg-indigo-900",
      "bg-purple-900",
      "bg-pink-900",
    ]
    let chosenColor = available[Math.floor(Math.random() * available.length)]

    const newCategory: any = {
      id: Math.floor(Math.random() * 1000000),
      name: this.newCategoryName,
      color: chosenColor,
    }

    this.newCategoryName = ""

    this.user.categories.push(newCategory)
  }

  addNewAddress(){
    this.user.addresses.push({
      id: Math.floor(Math.random() * 1000000),
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    })
  }

  removeAddress(addressId: number){
    this.user.addresses = this.user.addresses.filter(address => address.id !== addressId)
  }
  onDragEndAddress(event: DragEvent) {}
  onDragStartAddress(event: DragEvent, itemId: number) {}
  onDropAddress(event: DragEvent) {}
  onDragOverAddress(event: DragEvent) {}
}
