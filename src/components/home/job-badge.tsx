import Ionicons from '@expo/vector-icons/Ionicons';

import { Button, ButtonText } from '@/components/ui';
import { type TIonicons } from '@/types';

export type TBadge = {
  icon: TIonicons;
  label: string;
};

export const JobBadge = ({ label, icon }: TBadge) => {
  return (
    <Button
      variant="outline"
      className="h-auto w-fit rounded-full border-[#596574] bg-white px-3 py-2"
    >
      <Ionicons name={icon} size={16} />
      <ButtonText className="text-[14px] text-[#596574]">{label}</ButtonText>
    </Button>
  );
};
