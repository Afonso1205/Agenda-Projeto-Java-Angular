import { Component, ElementRef, ViewChild } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { NgxFileDropEntry } from "ngx-file-drop"
import { PrimeNGConfig } from "primeng/api"
import { ICategory, IContact } from "../../../interfaces"
import { DatePickerTranslation } from "../../../transaltionHelper"
import { ContactsService } from "../../services/contacts.service"
import { CategoriesService } from "../../services/categories.service"

@Component({
  selector: "app-add-contact",
  templateUrl: "./add-contact.component.html",
})
export class AddContactComponent {
  contactForm!: FormGroup
  avatarPreview: string | ArrayBuffer | null = null
  files: NgxFileDropEntry[] = []
  imageBase64: string | undefined

  constructor(
    private router: Router,
    private config: PrimeNGConfig,
    private fb: FormBuilder,
    private contactsService: ContactsService,
    private categoriesService: CategoriesService
  ) {
    this.contactForm = this.fb.group({
      name: ["", [Validators.required]],
      phone: [
        "",
        [Validators.required, Validators.pattern("^\\+?[0-9]{10,15}$")],
      ],
      email: ["", [Validators.email]],
      birthdate: [""],
      image: [""],
      theme: [""],
      addresses: this.fb.group({
        street: [""],
        city: [""],
        state: [""],
        country: [""],
        zip: [""],
      }),
      categories: [""],
    })
  }

  isNewCategoryVisible = false
  chosenCategories: ICategory[] = []
  availableCategories = [] as ICategory[]
  draggedItemId: number | null = null
  showCategoryForm = false
  newCategory = ""
  image: Blob | null = null
  showAddressForm = false

  ngOnInit() {
    this.config.setTranslation(DatePickerTranslation)

    this.fetchCategories()
  }

  fetchCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (categories) => {
        this.availableCategories = categories
      },
      error: (error) => {
        console.error(error)
      },
    })
  }

  addNewCategory() {
    let available = [
      "bg-blue-900",
      "bg-green-900",
      "bg-yellow-900",
      "bg-red-900",
      "bg-indigo-900",
      "bg-purple-900",
      "bg-pink-900",
    ]

    const chosenColor = available[Math.floor(Math.random() * available.length)]
    const categoryName = this.contactForm.get("categories")?.value

    console.log(categoryName)
    const newCategory: any = {
      name: categoryName,
      color: chosenColor,
    }

    this.categoriesService.createCategory(newCategory).subscribe({
      next: (category) => {
        this.availableCategories.push(category)
        this.contactForm.get("categories")?.setValue(category)
        this.isNewCategoryVisible = false
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {
        this.fetchCategories()
      },
    })
  }

  onSubmit(): void {
    let available = [
      "bg-blue-900",
      "bg-green-900",
      "bg-yellow-900",
      "bg-red-900",
      "bg-indigo-900",
      "bg-purple-900",
      "bg-pink-900",
    ]

    const chosenColor = available[Math.floor(Math.random() * available.length)]

    if (this.contactForm.valid) {
      let id = new Date().getTime()
      this.contactForm.value.id = id
      this.contactForm.value.categories = this.chosenCategories
      this.contactForm.value.addresses = [this.contactForm.value.addresses]
      this.contactForm.value.initial =
        this.contactForm.value.name[0].toUpperCase()
      this.contactForm.value.theme = chosenColor
      this.contactForm.value.image = ""

      this.contactsService.createContact(this.contactForm.value).subscribe({
        next: (contact) => {
          console.log(contact)
          this.router.navigate(["/"])
        },
        error: (error) => {
          console.error(error)
        },
      })
    }

    this.contactForm.markAllAsTouched()
  }

  dropped(files: NgxFileDropEntry[]): void {
    this.files = files
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry
        const file = fileEntry.file((file: File) => {
          if (this.isValidImage(file) && this.isFileSizeValid(file)) {
            this.image = file
            const reader = new FileReader()
            reader.onload = () => {
              this.avatarPreview = reader.result as string
            }
            reader.readAsDataURL(file)
            this.image = file
            const binaryString = reader.result as string
            this.imageBase64 = btoa(binaryString)
          } else if (!this.isValidImage(file)) {
            console.error("Formato de arquivo não suportado:", file.type)
          } else {
            console.error("Tamanho de arquivo excedido:", file.size)
          }
        })
      }
    }
  }

  selectCategory(category: ICategory) {
    //if category is already chosen return
    if (this.chosenCategories.some((c) => c.id === category.id)) {
      return
    }
    this.chosenCategories.push(category)
  }

  isValidImage(file: File): boolean {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]
    return allowedTypes.includes(file.type)
  }

  isFileSizeValid(file: File): boolean {
    const maxSize = 5000000
    return file.size <= maxSize
  }

  fileOver(event: any): void {
    console.log(event)
  }

  fileLeave(event: any): void {
    console.log(event)
  }

  toggleNewCategory() {
    event?.preventDefault()
    this.isNewCategoryVisible = !this.isNewCategoryVisible
  }

  toggleAddressForm() {
    event?.preventDefault()
    this.showAddressForm = !this.showAddressForm
  }

  toggleCategoryForm() {
    event?.preventDefault()
    this.showCategoryForm = !this.showCategoryForm
  }

  removeCategory(category: ICategory) {
    event?.preventDefault()
    this.chosenCategories = this.chosenCategories.filter(
      (chosenCategory) => chosenCategory.id !== category.id
    )
  }

  onDragStart(event: DragEvent, itemId: number): void {
    this.draggedItemId = itemId
    event.dataTransfer?.setData("text/plain", itemId.toString())
  }

  onDragEnd(event: DragEvent): void {
    this.draggedItemId = null
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault()
  }

  onDrop(event: DragEvent): void {
    event.preventDefault()
    const itemId = event.dataTransfer?.getData("text/plain")

    // remove the dragged item from the selected categories
    this.categoriesService.removeCategory(Number(itemId)).subscribe({
      next: (data) => {
        this.availableCategories = this.availableCategories.filter(
          (category) => category.id !== Number(itemId)
        )
      },
      error: (error) => {
        console.error(error)
      },
    })
  }

  onCancel() {
    this.router.navigate(["/"])
  }

  get name() {
    return this.contactForm.get("name")
  }
  get phone() {
    return this.contactForm.get("phone")
  }
  get email() {
    return this.contactForm.get("email")
  }
  get birthdate() {
    return this.contactForm.get("birthdate")
  }
  get street() {
    return this.contactForm.get("addresses.street")
  }
  get city() {
    return this.contactForm.get("addresses.city")
  }
  get state() {
    return this.contactForm.get("addresses.state")
  }
  get country() {
    return this.contactForm.get("addresses.country")
  }
  get zip() {
    return this.contactForm.get("addresses.zip")
  }
}
