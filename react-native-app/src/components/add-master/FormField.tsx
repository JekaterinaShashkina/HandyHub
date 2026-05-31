import { FormTextInput } from '@/components/common/FormTextInput';

type FormFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: 'default' | 'phone-pad' | 'email-address' | 'numeric';
};

export function FormField({
  label,
  value,
  onChangeText,
  keyboardType = 'default',
}: FormFieldProps) {
  return (
    <FormTextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  );
}
