import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: "album-list",
  templateUrl: "./album-list.component.html",
  styleUrls: ["./album-list.component.scss"],
})
export class AlbumListComponent implements OnInit {
  albumList: Array<any> = [];

  constructor(private http: HttpClient) {}

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
