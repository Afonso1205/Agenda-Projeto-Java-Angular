import { Routes } from "@angular/router"
import { HomeComponent } from "./pages/home/home.component"
import { AddContactComponent } from "./pages/add-contact/add-contact.component"
import { ContactComponent } from "./pages/contact/contact.component"

export const routes: Routes = [
  { path: "", pathMatch: "full", component: HomeComponent },
  { path: 'add-contact', component: AddContactComponent },
  { path: ':id', component: ContactComponent }
]
