import { SharePointItem, select, expand, parser } from 'sp-pnpjs-utility';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'lodash';

export class Employee extends SharePointItem {
    static listName = 'Personnel';
    static validationMessages = {
        Title: {
            required: `Title is required.`
        }
    };

    @select()
    @parser({ isReadOnly: false })
    Title: string;

    @select('PogSingle/EMail,PogSingle/Id,PogSingle/Title')
    @expand('PogSingle')
    @parser({ parser: 'Lookup', lookupColumnName: 'Title', isReadOnly: false })
    PogSingle: { Id: number, Title: string, EMail: string };

    @select('PogMulti/Id,PogMulti/Title')
    @expand('PogMulti')
    @parser({ parser: 'LookupMulti', lookupColumnName: 'Title', isReadOnly: false })
    PogMulti: { Id: number, Title: string, EMail: string }[];

    @select()
    @parser({ parser: 'DateTime', isReadOnly: false })
    BirthDate: Date;

    @select('Country/Id,Country/Title')
    @expand('Country')
    @parser({ parser: 'Lookup', lookupColumnName: 'Title', isReadOnly: false })
    Country: { Id: number, Title: string };

    @select('FavoriteCountries/Id,FavoriteCountries/Title')
    @expand('FavoriteCountries')
    @parser({ parser: 'LookupMulti', lookupColumnName: 'Title', isReadOnly: false })
    FavoriteCountries: { Id: number, Title: string }[];

    @select()
    @parser({ isReadOnly: false })
    MLOT: string;

    @select()
    @parser({ isReadOnly: false })
    Choice: string;

    @select()
    @parser({ isReadOnly: false })
    ChoiceRadio: string;

    @select()
    @parser({ parser: 'MultiChoice', isReadOnly: false })
    ChoiceMulti: string[];

    @select()
    @parser({ isReadOnly: false })
    Number: number;

    @select()
    @parser({ isReadOnly: false })
    Currency: number;

    @select()
    @parser({ isReadOnly: false })
    YesNo: boolean;

    static get choiceFields() {
        return {
            ChoiceMulti: ['French Fries', 'Rice', 'Mashed Potatoes']
        };
    };

    static fromFormGroup(fg: FormGroup, id?: number): Employee {
        const itemToSave = new Employee();
        itemToSave.Id = id;
        itemToSave.Title = fg.value.Title;
        itemToSave.PogSingle = (fg.value.PogSingle && fg.value.PogSingle.length) ? fg.value.PogSingle[0] : null;
        itemToSave.PogMulti = fg.value.PogMulti;
        itemToSave.BirthDate = fg.value.BirthDate;
        itemToSave.Country = (fg.value.Country && fg.value.Country.length) ? fg.value.Country[0] : null;;
        itemToSave.FavoriteCountries = fg.value.FavoriteCountries;
        itemToSave.MLOT = fg.value.MLOT;
        itemToSave.Choice = fg.value.Choice;
        itemToSave.ChoiceRadio = fg.value.ChoiceRadio;
        itemToSave.ChoiceMulti = this.getSelectedChoices(this.choiceFields['ChoiceMulti'], fg.value.ChoiceMulti);
        itemToSave.Number = fg.value.Number;
        itemToSave.Currency = fg.value.Currency;
        itemToSave.YesNo = fg.value.YesNo;
        return itemToSave;
    }

    static getSelectedChoices(choices: string[], selections: boolean[]): string[] {
        const selected = [];
        choices.forEach((c, i) => {
            if (selections[i]) {
                selected.push(c);
            }
        });
        return selected;
    }

    toFormGroup(fb: FormBuilder): FormGroup {
        return fb.group({
            Title: [this.Title || '', [Validators.required]],
            PogSingle: [(!!this.PogSingle) ? [this.PogSingle] : [], []],
            PogMulti: [this.PogMulti || [], []],
            BirthDate: [(this.BirthDate) ? this.BirthDate : null, []],
            Country: [(!!this.Country) ? [this.Country] : [], []],
            FavoriteCountries: [this.FavoriteCountries || [], []],
            MLOT: [this.MLOT || '', []],
            Choice: [this.Choice || '', []],
            ChoiceRadio: [this.ChoiceRadio || '', []],
            ChoiceMulti: this.buildReactiveFormArray(fb, Employee.choiceFields['ChoiceMulti'], this.ChoiceMulti),
            Number: [this.Number, []],
            Currency: [this.Currency, []],
            YesNo: [this.YesNo, []]
        });
    }

    buildReactiveFormArray(fb: FormBuilder, choices: string[], preselected: string[]) {
        const arr = choices.map(c => {
            return fb.control(_.includes(preselected, c));
        });
        return fb.array(arr);
    }
}
