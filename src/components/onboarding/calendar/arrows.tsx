import Ionicons from '@expo/vector-icons/Ionicons';

export const _renderArrows = (direction: string) => {
  return direction === 'left' ? (
    <Ionicons name="arrow-back" size={24} color="black" />
  ) : (
    <Ionicons name="arrow-forward" size={24} color="black" />
  );
};
