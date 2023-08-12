import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  async createNewAlbum(album: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };

    try {
      await this.http
        .post<any>(
          "http://localhost:3000/album/create",
          JSON.stringify(album),
          httpOptions
        )
        .toPromise();

      window.location.reload();
    } catch (error) {
      console.error("Error creating album:", error);
    }
  }

  isValidAlbum(): boolean {
    return (
      this.album.title.trim() !== "" &&
      this.album.artist.trim() !== "" &&
      (this.album.score === undefined || this.album.score <= 5)
    );
  }
}
