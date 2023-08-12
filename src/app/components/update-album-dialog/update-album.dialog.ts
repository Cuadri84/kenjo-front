import { Component, Inject, Input, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import Swal from "sweetalert2";
import { AlbumService } from "../../services/album.service"; // Ruta al servicio
import { HttpHeaders } from "@angular/common/http";

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
    private albumService: AlbumService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdateAlbumDialog>
  ) {}

  ngOnInit(): void {
    this.title = this.data.title;
    this.photoUrl = this.data.photoUrl;
    this.year = this.data.year;
    this.artist = this.data.artist;
    this.score = this.data.score;
  }

  // Update album functionality
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
        await this.albumService.updateAlbum(albumToUpdate).subscribe(() => {
          this.albumService.getAlbumUpdatedEvent().emit();
          this.dialogRef.close();
        });
      } catch (error) {
        console.error("Error updating album:", error);
      }
    }
  }
}
