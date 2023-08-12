import { Component, OnInit } from "@angular/core";
import { AlbumService } from "../../services/album.service";

@Component({
  selector: "new-album-dialog",
  templateUrl: "new-album.dialog.html",
  styleUrls: ["./new-album.dialog.scss"],
})
export class NewAlbumDialog implements OnInit {
  album = {
    title: "",
    year: 1900,
    artist: "",
    photoUrl: "",
    score: 0,
  };

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {}

  // Create new album functionality
  async createNewAlbum(album: any) {
    try {
      await this.albumService.createAlbum(album).subscribe(() => {
        this.albumService.getAlbumCreatedEvent().emit();
      });
    } catch (error) {
      console.error("Error creating album:", error);
    }
  }

  // Disable confirm button if there is no album, artist, or stars
  isValidAlbum(): boolean {
    return (
      this.album.title.trim() !== "" &&
      this.album.artist.trim() !== "" &&
      (this.album.score === undefined || this.album.score <= 5)
    );
  }
}
