import { Component, EventEmitter, Input, Output } from "@angular/core"
import { Router } from "@angular/router"
import { Subject, debounceTime } from "rxjs"

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent {
  @Input() isHome: boolean | null = null
  @Output() searchEvent = new EventEmitter<string>()

  title: string = ""
  private searchSubject = new Subject<string>()

  constructor(private router: Router) {
    this.searchSubject.pipe(debounceTime(300)).subscribe((term) => {
      this.searchEvent.emit(term)
    })
  }


  onSearch(event: Event) {
    const target = event.target as HTMLInputElement
    const termValue = target.value
    const term = termValue.trim()
    this.searchSubject.next(term)
  }

  ngOnInit() {
    this.title = this.isHome ? "Meus contatos" : "Gerenciar"
  }

  onCancel() {
    this.router.navigate(["/"])
  }
}
