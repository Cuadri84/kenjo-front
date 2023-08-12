import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import Swal from "sweetalert2";
import { UpdateAlbumDialog } from "../update-album-dialog/update-album.dialog";
import { AlbumService } from "../../services/album.service"; // Ruta al servicio

@Component({
  selector: "album-list",
  templateUrl: "./album-list.component.html",
  styleUrls: ["./album-list.component.scss"],
})
export class AlbumListComponent implements OnInit, OnDestroy {
  albumList: Array<any> = [];
  selectedSortOption: string = "stars";
  searchArtist: string = "";

  constructor(private albumService: AlbumService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadAlbumList();
    this.subscribeToAlbumEvents();
  }
  ngOnDestroy(): void {
    this.unsubscribeFromAlbumEvents();
  }
  private subscribeToAlbumEvents(): void {
    this.albumService.getAlbumCreatedEvent().subscribe(() => {
      this.loadAlbumList();
    });

    this.albumService.getAlbumUpdatedEvent().subscribe(() => {
      this.loadAlbumList();
    });
  }

  private unsubscribeFromAlbumEvents(): void {
    this.albumService.getAlbumCreatedEvent().unsubscribe();
    this.albumService.getAlbumUpdatedEvent().unsubscribe();
  }

  async loadAlbumList(): Promise<void> {
    try {
      this.albumService.getAlbumList().subscribe((data) => {
        this.albumList = data;
      });
    } catch (error) {
      console.error("Error loading album list:", error);
    }
  }

  getStarsArray(score: number): any[] {
    return new Array(score);
  }

  //SORT by stars, artist or year
  sortByStars() {
    this.albumList.sort((a, b) => b.score - a.score);
  }

  sortByArtist() {
    this.albumList.sort((a, b) => a.artist.localeCompare(b.artist));
  }

  sortByYear() {
    this.albumList.sort((a, b) => a.year - b.year);
  }

  //Search by artist name
  onSearchChange() {
    if (this.searchArtist.trim() === "") {
      this.ngOnInit();
    } else {
      this.albumList = this.albumList.filter((album) =>
        album.artist.toLowerCase().includes(this.searchArtist.toLowerCase())
      );
    }
  }

  //Edit Button functionality
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
  //Delete Button Functionality
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
        await this.albumService.deleteAlbum(album._id).subscribe(() => {
          this.albumList.splice(i, 1);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        });
      } catch (error) {
        console.error("Error deleting album:", error);
      }
    }
  }
}
