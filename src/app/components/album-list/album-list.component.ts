import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import Swal from "sweetalert2";
import { UpdateAlbumDialog } from "../update-album-dialog/update-album.dialog";

@Component({
  selector: "album-list",
  templateUrl: "./album-list.component.html",
  styleUrls: ["./album-list.component.scss"],
})
export class AlbumListComponent implements OnInit {
  albumList: Array<any> = [];
  selectedSortOption: string = "stars";
  searchArtist: string = "";

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  async ngOnInit(): Promise<void> {
    try {
      const data = await this.http
        .get<any[]>("http://localhost:3000/album")
        .toPromise();
      this.albumList = data;
    } catch (error) {
      console.error("Error loading album list:", error);
    }
  }
  getStarsArray(score: number): any[] {
    return new Array(score);
  }

  sortByStars() {
    this.albumList.sort((a, b) => b.score - a.score);
  }

  sortByArtist() {
    this.albumList.sort((a, b) => a.artist.localeCompare(b.artist));
  }

  sortByYear() {
    this.albumList.sort((a, b) => a.year - b.year);
  }

  onSearchChange() {
    // Filtra la lista de álbumes según el nombre del artista
    if (this.searchArtist.trim() === "") {
      // Si el campo de búsqueda está vacío, muestra todos los álbumes
      this.ngOnInit();
    } else {
      this.albumList = this.albumList.filter((album) =>
        album.artist.toLowerCase().includes(this.searchArtist.toLowerCase())
      );
    }
  }

  async openDialogUpdateAlbum(album: any) {
    console.log("Album data being passed to child:", album);
    const dialogRef = this.dialog.open(UpdateAlbumDialog, {
      data: {
        _id: album._id,
        title: album.title,
        photoUrl: album.photoUrl,
        year: album.year,
        artist: album.artist,
        score: album.score,
      },
    });

    try {
      const result = await dialogRef.afterClosed().toPromise();
    } catch (error) {
      console.error("Error in dialog:", error);
    }
  }

  async deleteAlbum(album: any, i: number): Promise<void> {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await this.http
          .delete(`http://localhost:3000/album/${album._id}`)
          .toPromise();
        this.albumList.splice(i, 1);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting album:", error);
      }
    }
  }
}
