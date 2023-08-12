import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AlbumService {
  private apiUrl = "http://localhost:3000/album";
  private albumCreated = new EventEmitter<void>();
  private albumUpdated = new EventEmitter<void>();

  getAlbumCreatedEvent(): EventEmitter<void> {
    return this.albumCreated;
  }

  getAlbumUpdatedEvent(): EventEmitter<void> {
    return this.albumUpdated;
  }

  constructor(private http: HttpClient) {}

  getAlbumList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createAlbum(album: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, album);
  }

  updateAlbum(album: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${album._id}`, album);
  }

  deleteAlbum(albumId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${albumId}`);
  }
}
