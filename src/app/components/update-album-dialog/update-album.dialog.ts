import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "update-album-dialog",
  templateUrl: "update-album.dialog.html",
  styleUrls: ["./update-album.dialog.scss"],
})
export class UpdateAlbumDialog implements OnInit {
  album = {
    title: "",
    year: 1900,
    artist: "",
    photoUrl: "",
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  async updateAlbum(album: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };

    try {
      await this.http
        .put<any>(
          `http://localhost:3000/album/${album._id}`,
          JSON.stringify(album),
          httpOptions
        )
        .toPromise();

      window.location.reload();
    } catch (error) {
      console.error("Error updating album:", error);
    }
  }
}
