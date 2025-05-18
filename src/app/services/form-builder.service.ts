import { FieldConfig, ResumeFormSchema, SectionConfig } from '@/config/form-config';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ValidatorFn } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormBuilderService {
    constructor(private fb: FormBuilder) { }

    createForm(schema: ResumeFormSchema): FormGroup {
        const group: any = {};
        for (const key of Object.keys(schema)) {
            const section = schema[key] as SectionConfig;

            if (section.isRepeatable) {
                group[key] = this.fb.array([this.createSectionGroup(section)]);
            } else {
                group[key] = this.createSectionGroup(section);
            }
        }
        return this.fb.group(group);
    }

    createSectionGroup(section: SectionConfig): FormGroup {
        const group: any = {};
        section.fields.forEach((field: FieldConfig) => {
            group[field.key] = this.fb.control('', this.resolveValidators(field.validators || []));
        });
        return this.fb.group(group);
    }

    resolveValidators(validatorNames: string[]): ValidatorFn[] {
        const map: { [key: string]: ValidatorFn } = {
            required: Validators.required,
            email: Validators.email,
            minLength: Validators.minLength(3),
            maxLength: Validators.maxLength(255),
        };

        return validatorNames
            .map(name => map[name])
            .filter((v): v is ValidatorFn => typeof v === 'function');
    }

    getFormArray(form: FormGroup, key: string): FormArray {
        return form.get(key) as FormArray;
    }

    addFormArrayItem(form: FormGroup, key: string, section: SectionConfig): void {
        const array = this.getFormArray(form, key);
        array.push(this.createSectionGroup(section));
    }

    removeFormArrayItem(form: FormGroup, key: string, index: number): void {
        const array = this.getFormArray(form, key);
        if (array.length > 1) array.removeAt(index);
    }
}
