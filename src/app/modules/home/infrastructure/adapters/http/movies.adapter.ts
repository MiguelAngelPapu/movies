import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import { environment as env } from "../../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MoviesAdapter {

    public readonly apiUrl = `${env.BASE_URL}/movie`;
    
    private _params = new HttpParams()
        .set('page', '1');

    public get params(): HttpParams {
        return this._params;
    }

    public set params(options: Record<string, any>) {
        if (!options) return;

        let newParams = this._params;
        for (const key in options) {
            if (options.hasOwnProperty(key)) {
                newParams = newParams.set(key, String(options[key]));
            }
        }
        this._params = newParams;
    }
}