import { Injectable, Inject } from "@angular/core";
import { MapService } from "./mapservice.service";
import { LocationsService } from "./locations.service";
import { MonsterClass } from "./monster-class.service";
import { HttpClient } from "@angular/common/http";

type SortedBy = "name" | "location" | "status" | "timeReported";
const STORAGE = "https://272.selfip.net/apps/4remj5i1jO/collections/monsters/documents/"
const HASH = 'fcab0453879a2b2281bc5073e3f5fe54'

@Injectable({
    providedIn: "root"
})

export class MonsterService {
    monster: MonsterClass[];
    private counter: number = 0; // Counter variable for generating unique IDs
    sortedby: SortedBy = "name";

    constructor(@Inject(MapService) private mapService: MapService, 
    @Inject(LocationsService) private locationsService: LocationsService,
    @Inject(HttpClient) private http: HttpClient) {
        this.monster = [];
    }
    private findMonster(id: number): MonsterClass | undefined {
        return this.monster.find(m => m.id === id);
    }


    get(): MonsterClass[] {
        return this.monster;
    }

    convertEpochToNormalTime(epochTime: number): string {
        const date = new Date(epochTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} (${hours}:${minutes})`;
    }

    add(newMonster: MonsterClass, post: boolean = false) {
        newMonster.timeReported = this.convertEpochToNormalTime(Date.now());

        for (let x of this.locationsService.getLocations()){
            if (newMonster.location == x.name){
                newMonster.longitude = x.longitude;
                newMonster.latitude = x.latitude;
                break;
            }
        }

        newMonster.status = "Open";
        newMonster.id = this.counter;
        this.counter++;
        this.monster.push(newMonster);
        this.mapService.createMarker(newMonster);
        this.sort(this.sortedby);

        if (post) return;

        this.http.post(STORAGE, { 
            "key": newMonster.id.toString(),
            "data": {
                "name": newMonster.name,
                "location": newMonster.location,
                "latitude": newMonster.latitude,
                "longitude": newMonster.longitude,
                "description": newMonster.description,
                "image": newMonster.image,
                "status": newMonster.status,
                "timeReported": newMonster.timeReported,
                "reportedBy": newMonster.reportedBy,
                "phoneNumber": newMonster.phoneNumber
            }
        }).subscribe();
    }

    verifyPassword(password: string): Promise<boolean> {        
        return new Promise((resolve, reject) => {
            this.http.get(`https://api.hashify.net/hash/md5/hex?value=${password}`).subscribe((data: any) => {
                resolve(data.Digest.toString() === HASH);
            })
        })
    }

    closeMonster(close_monster: number) {
        const monster = this.findMonster(close_monster);
        if (monster) {
            this.mapService.removeMarker(monster);
            monster.status = "Closed";
        }
        return monster;
    }

    delete(delete_monster: number) {
        this.counter--;
        const monsterToDelete = this.findMonster(delete_monster);
        if (monsterToDelete) {
            this.mapService.removeMarker(monsterToDelete);
            this.monster = this.monster.filter(m => m.id !== delete_monster);
        }
        this.http.delete(`${STORAGE}${delete_monster}`).subscribe();
        return this.monster;
    }

    info(info_monster: number) {
        return this.findMonster(info_monster);
    }

    sort(key: SortedBy) {
        this.sortedby = key;
        this.monster.sort((a, b) => a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0);
    }
}

