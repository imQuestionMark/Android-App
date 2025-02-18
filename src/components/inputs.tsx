import { useState } from 'react';
import { Text } from 'react-native';

import type { OptionType } from '@/components/ui';
import { Input, Select, View } from '@/components/ui';
import { Checkbox, Radio, Switch } from '@/components/ui';

const options: OptionType[] = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export const Inputs = () => {
  const [value, setValue] = useState<number | string | undefined>();
  return (
    <>
      <Text>Form</Text>
      <View>
        <Input label="Default" placeholder="Lorem ipsum dolor sit amet" />
        <Input label="Error" error="This is a message error" />
        <Input label="Focused" />
        <Select
          value={value}
          label="Select"
          options={options}
          onSelect={(option) => setValue(option)}
        />
        <CheckboxExample />
        <RadioExample />
        <SwitchExample />
      </View>
    </>
  );
};

const CheckboxExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox.Root
      className="pb-2"
      checked={checked}
      onChange={setChecked}
      accessibilityLabel="accept terms of condition"
    >
      <Checkbox.Icon checked={checked} />
      <Checkbox.Label text="checkbox" />
    </Checkbox.Root>
  );
};

const RadioExample = () => {
  const [selected, setSelected] = useState(false);
  return (
    <Radio.Root
      className="pb-2"
      checked={selected}
      onChange={setSelected}
      accessibilityLabel="radio button"
    >
      <Radio.Icon checked={selected} />
      <Radio.Label text="radio button" />
    </Radio.Root>
  );
};

const SwitchExample = () => {
  const [active, setActive] = useState(false);
  return (
    <Switch.Root
      checked={active}
      className="pb-2"
      onChange={setActive}
      accessibilityLabel="switch"
    >
      <Switch.Icon checked={active} />
      <Switch.Label text="switch" />
    </Switch.Root>
  );
};
