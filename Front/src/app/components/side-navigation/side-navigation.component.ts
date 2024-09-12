import { Component, EventEmitter, Input, Output } from "@angular/core"
import { ICategory, INavigationLetter } from "../../../interfaces"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { CategoriesService } from "../../services/categories.service"

@Component({
  selector: "app-side-navigation",
  templateUrl: "./side-navigation.component.html",
})
export class SideNavigationComponent {
  categoryForm!: FormGroup

  @Input() letters: { letter: string; isActive: boolean }[] = []
  @Input() selectedLetter: string = ""
  @Input() categories: any[] = []
  @Input() selectedCategories: ICategory[] = []
  @Output() sideNavigationClick = new EventEmitter<string>()
  @Output() categoryClick = new EventEmitter<number>()

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoriesService
  ) {
    this.categoryForm = this.fb.group({
      name: ["", Validators.required],
    })
  }
  handleCategoryClick(categoryId: number): void {
    this.categoryClick.emit(categoryId)
  }

  isEditMode = false

  draggedItemId: number | null = null

  isIncluded(categoryId: number): string {
    let item = this.selectedCategories.some(
      (category) => category.id === categoryId
    )
    if (item) {
      return "border-zinc-200"
    } else {
      return ""
    }
  }

  handleSideNavigation(letter: string): void {
    this.sideNavigationClick.emit(letter)
  }

  handleEditCategory(): void {
    this.isEditMode = !this.isEditMode
  }

  onSubmit() {
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
    const categoryName = this.categoryForm.get("name")?.value
    if (!categoryName || categoryName.length < 2) {
      this.categoryForm.get("name")?.setErrors({ required: true })
    }

    const newCategory: any = {
      name: categoryName,
      color: chosenColor,
    }

    this.categoryService.createCategory(newCategory).subscribe({
      next: (data) => {
        this.categories.push(data)
        this.categoryForm.reset()
      },
      error: (error) => {
        console.error(error)
      },
    })
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
    this.categoryService.removeCategory(Number(itemId)).subscribe({
      next: (data) => {
        this.categories = this.categories.filter(
          (category) => category.id !== Number(itemId)
        )
      },
      error: (error) => {
        console.error(error)
      },
    })
  }
}
