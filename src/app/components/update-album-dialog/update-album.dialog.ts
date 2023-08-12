import { Component, Inject, Input, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: "update-album-dialog",
  templateUrl: "update-album.dialog.html",
  styleUrls: ["./update-album.dialog.scss"],
})
export class UpdateAlbumDialog implements OnInit {
  @Input() title!: string;
  @Input() photoUrl!: string;
  @Input() year!: number;
  @Input() artist!: string;
  @Input() score!: number;

  constructor(
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.title = this.data.title;
    this.photoUrl = this.data.photoUrl;
    this.year = this.data.year;
    this.artist = this.data.artist;
    this.score = this.data.score;
  }

  //Update album funtionality
  async updateAlbum() {
    const albumToUpdate = {
      _id: this.data._id,
      title: this.title,
      photoUrl: this.photoUrl,
      year: this.year,
      artist: this.artist,
      score: this.score,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });
    if (result.isConfirmed) {
      try {
        await this.http
          .put<any>(
            `http://localhost:3000/album/${albumToUpdate._id}`,
            JSON.stringify(albumToUpdate),
            httpOptions
          )
          .toPromise();

        window.location.reload();
      } catch (error) {
        console.error("Error updating album:", error);
      }
    }
  }
}
