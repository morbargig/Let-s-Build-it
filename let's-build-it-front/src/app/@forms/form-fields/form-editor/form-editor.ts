import { SelectItem } from '../../../@ideo/components/table/models/select-item';
import { Observable } from 'rxjs';
export class FormEditor {
  constructor(obj: FormEditor = null) {
    if (!!obj) {
      Object.keys(obj).forEach((key) => (this[key] = obj[key]));
    }
  }

  public tagsToolbar?: { title: string; icon?: string; items: SelectItem[] }[];
  public localizationSource?: (query: string) => Observable<SelectItem[]>;
}
