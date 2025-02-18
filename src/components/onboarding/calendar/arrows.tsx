import { ArrowLeft, ArrowRight } from 'lucide-react-native';

import { black } from '@/components/ui/colors';

export const _renderArrows = (direction: string) => {
  return direction === 'left' ? (
    <ArrowLeft color={black} />
  ) : (
    <ArrowRight color={black} />
  );
};
