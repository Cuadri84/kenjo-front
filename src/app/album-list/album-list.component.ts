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

  ngOnInit(): void {
    this.http
      .get<any[]>("http://localhost:3000/album")
      .subscribe((data: Array<any>) => (this.albumList = data));
  }

  deleteAlbum(album: any, i: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .delete(`http://localhost:3000/album/${album._id}`)
          .subscribe();
        this.albumList.splice(i, 1);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }
}
