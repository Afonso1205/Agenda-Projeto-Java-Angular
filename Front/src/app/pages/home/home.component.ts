import { letterColors } from "./../../../fakeData"
import { ICategory, IContact, INavigationLetter } from "./../../../interfaces"
import { Component } from "@angular/core"
import { ContactsService } from "../../services/contacts.service"
import { CategoriesService } from "../../services/categories.service"
import { forkJoin } from "rxjs"

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent {
  letterColors = letterColors
  isSelectMultipleOn: boolean = false
  letters: INavigationLetter[] = []
  isLetterActive: boolean = false
  selectedLetter: string = ""
  selectedUsers: any
  users: IContact[] | undefined = undefined
  filteredUsers: IContact[] | undefined = undefined
  categories!: ICategory[]
  selectedCategories: ICategory[] = []
  loading: boolean = true

  constructor(
    private _contactsService: ContactsService,
    private _categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    forkJoin([
      this._contactsService.getAllContacts(),
      this._categoriesService.getAllCategories(),
    ]).subscribe({
      next: ([contacts, categories]) => {
        contacts.sort((a: IContact, b: IContact) => {
          return a.name.localeCompare(b.name)
        })
        this.users = contacts
        this.filteredUsers = this.users
        this.categories = categories
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {
        this.loading = false
      },
    })

    this.fetchContacts()
    this.fetchCategories()
  }

  removeContact(contacts: IContact[]): void {
    if (this.isSelectMultipleOn) {
      let selectedContacts = this.selectedUsers
      let contactsIdsToDelete = selectedContacts.map((c: IContact) => c.id)

      this._contactsService
        .removeMultipleContacts(contactsIdsToDelete)
        .subscribe({
          next: (data) => {
            this.selectedUsers = []
            this.selectedLetter = ""
            this.fetchContacts()
          },
          error: (error) => {
            console.error(error)
          },
        })
    } else {
      contacts.forEach((contact) => {
        this._contactsService.removeContact(contact.id).subscribe({
          next: (data) => {
            this.selectedUsers = []
            this.selectedLetter = ""
            this.fetchContacts()
          },
          error: (error) => {
            console.error(error)
          },
        })
      })
    }
  }

  fetchContacts() {
    this._contactsService.getAllContacts().subscribe({
      next: (data) => {
        data.sort((a: IContact, b: IContact) => {
          return a.name.localeCompare(b.name)
        })
        this.users = data
        this.filteredUsers = this.users

        data.forEach((user) => {
          let letter = user.initial
          if (this.letters.some((l) => l.letter === letter)) {
            return
          }
          this.letters.push({
            letter: letter,
            isActive: false,
          })
        })
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {},
    })
  }

  fetchCategories() {
    this._categoriesService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data
        console.log(this.categories)
      },
      error: (error) => {
        console.error(error)
      },
    })
  }

  handleCategoryClick(categoryId: number): void {
    let target = this.categories?.find((category) => category.id === categoryId)

    if (this.selectedCategories.some((c) => c.id === categoryId)) {
      this.selectedCategories = this.selectedCategories.filter(
        (c) => c.id !== categoryId
      )
    } else {
      this.selectedCategories.push(target!)
    }

    this.filteredUsers = this.users?.filter((user) => {
      return user.categories.some((c) =>
        this.selectedCategories.some((sc) => sc.id === c.id)
      )
    })

    if (this.selectedCategories.length === 0) {
      this.filteredUsers = this.users
    }
  }

  onIsSelectMultipleChanged(value: boolean) {
    this.isSelectMultipleOn = !value
  }

  handleUserSelectionChange(user: IContact): void {
    user.selected = !user.selected
  }

  handleSearch(term: string) {
    if (term) {
      this.filteredUsers = this.users?.filter(
        (user) =>
          user.name.toLowerCase().includes(term.toLowerCase()) ||
          user.email.toLowerCase().includes(term.toLowerCase()) ||
          user.phone.toLowerCase().includes(term.toLowerCase()) ||
          user.categories.some((category) =>
            category.name.toLowerCase().includes(term.toLowerCase())
          )
      )
    } else {
      this.filteredUsers = this.users
    }
  }

  handleSideNavigation(letter: string): void {
    this.letters.forEach((l) => (l.isActive = l.letter === letter))
    let target = this.users?.find((user) => user.name[0] === letter)
    if (target) {
      let element = document.getElementById(`user-${target.id}`)
      if (element) {
        const yOffset = -200
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ behavior: "smooth", top: y })
      }
    }

    this.filteredUsers = this.users?.filter((user) => user.name[0] === letter)
  }

  handleUserCardClick(letter: string, userId: number): void {
    this.letters.forEach((l) => (l.isActive = false))

    const targetLetter = this.letters.find((obj) => obj.letter === letter)

    if (targetLetter) {
      this.selectedLetter = targetLetter.letter
    }

    const targetUser = this.users?.find((user) => user.id === userId)

    if (!this.isSelectMultipleOn) {
      this.selectedUsers =
        this.selectedUsers?.id === userId ? undefined : targetUser
    } else {
      if (this.selectedUsers === undefined) {
        this.selectedUsers = [targetUser!]
      } else if (Array.isArray(this.selectedUsers)) {
        if (this.selectedUsers.some((u) => u.id === targetUser?.id)) {
          this.selectedUsers = this.selectedUsers.filter(
            (u) => u.id !== targetUser?.id
          )
        } else {
          this.selectedUsers.push(targetUser!)
        }
      } else {
        if (this.selectedUsers.id === targetUser?.id) {
          this.selectedUsers = undefined
        } else {
          this.selectedUsers = [this.selectedUsers, targetUser!]
        }
      }
    }
  }

  handleUserMouseOver(letter: string): void {
    let target = this.letters.find((obj) => obj.letter === letter)
    if (target) {
      target.isActive = true
    }
  }

  handleUserMouseLeave(letter: string): void {
    let target = this.letters.find((obj) => obj.letter === letter)
    if (target) {
      target.isActive = false
    }
  }
}
