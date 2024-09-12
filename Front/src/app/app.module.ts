import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { HomeComponent } from "./pages/home/home.component"
import { HeaderComponent } from "./components/header/header.component"
import { UserListComponent } from "./components/user-list/user-list.component"
import { SideNavigationComponent } from "./components/side-navigation/side-navigation.component"
import { AddContactComponent } from "./pages/add-contact/add-contact.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { CalendarModule } from "primeng/calendar"
import { NgxFileDropModule } from "ngx-file-drop"
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask"
import { provideHttpClient } from "@angular/common/http";
import { ContactComponent } from './pages/contact/contact.component'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    HeaderComponent,
    UserListComponent,
    SideNavigationComponent,
    AddContactComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    CalendarModule,
    NgxFileDropModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [provideNgxMask(), provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
