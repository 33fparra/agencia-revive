import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class LoadingCounterService {
  private loadingCounter$ = new BehaviorSubject<number>(0);
  counter$ = this.loadingCounter$.asObservable();

  get isLoading(): boolean {
    return this.loadingCounter$.getValue() > 0;
  }

  setLoading() {
    const count = this.loadingCounter$.getValue() + 1;
    this.loadingCounter$.next(count);
  }

  setNoLoading() {
    const count = this.loadingCounter$.getValue() - 1;
    if (count >= 0)
      this.loadingCounter$.next(count);
  }
}
