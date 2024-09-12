import { Component, EventEmitter, Input, Output } from "@angular/core"
import { ICategory, IContact } from "../../../interfaces"

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
})
export class UserListComponent {
  @Input() users: IContact[] | undefined = undefined
  @Input() filteredUsers: IContact[] | undefined = undefined
  @Input() selectedUsers: any
  @Input() letterColors: { [key: string]: string } = {}
  @Input() isSelectMultipleOn!: boolean;
  @Input() categories: ICategory[] = []

  @Output() userMouseOver = new EventEmitter<string>()
  @Output() userMouseLeave = new EventEmitter<string>()
  @Output() userCardClick = new EventEmitter<{ initial: string; id: number }>()
  @Output() userSelectionChange = new EventEmitter<{ user: IContact }>()

  @Output() selectMultipleEvent = new EventEmitter<boolean>()
  @Output() deleteUsersEvent = new EventEmitter<{ users: IContact[] }>()

  handleUserDeletion(){
    this.deleteUsersEvent.emit({ users: [this.selectedUsers] })
  }

  toggleSelectMultiple() {
    this.selectMultipleEvent.emit(this.isSelectMultipleOn)
  }

  isSelected(userId: number): boolean {
    if (!this.isSelectMultipleOn) {
      return false
    }

    if (!this.selectedUsers) {
      return false
    }
    
    if (Array.isArray(this.selectedUsers)) {
      return this.selectedUsers.some((user) => user.id === userId)
    } else {
      return this.selectedUsers.id === userId
    }
  }

  handleUserMouseOver(initial: string) {
    this.userMouseOver.emit(initial)
  }

  handleUserMouseLeave(initial: string) {
    this.userMouseLeave.emit(initial)
  }

  handleUserCardClick(initial: string, id: number) {
    this.userCardClick.emit({ initial, id })
  }

  handleUserSelectionChange(user: IContact) {
    this.userSelectionChange.emit({ user })
  }
}
