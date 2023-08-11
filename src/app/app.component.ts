import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NewAlbumDialog } from "src/app/components/new-album-dialog/new-album.dialog";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "kenjo-challenge-frontend";
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  async openDialogNewAlbum() {
    const dialogRef = this.dialog.open(NewAlbumDialog, {
      data: { test: true },
    });

    try {
      const result = await dialogRef.afterClosed().toPromise();
    } catch (error) {
      console.error("Error in dialog:", error);
    }
  }
}
